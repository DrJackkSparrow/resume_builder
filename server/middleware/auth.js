import jwt from 'jsonwebtoken';
import { db } from '../db/index.js';

// Use a secret from environment variables or fallback for dev
const JWT_SECRET = process.env.JWT_SECRET || 'unformat_super_secret_dev_key';

/**
 * Middleware to verify standard user authentication
 * Extracts the JWT from cookies or Authorization header
 */
export const verifyUserToken = (req, res, next) => {
  try {
    let token;

    // Check for token in HttpOnly cookie
    if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    } 
    // Fallback to checking Authorization header (Bearer token)
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    // Cryptographically verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Attach the decoded user payload (which includes id) to the request object
    req.user = decoded;

    next();
  } catch (error) {
    // If verification fails (expired, invalid signature), block request
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

/**
 * Middleware to verify admin privileges
 * Must be run AFTER verifyUserToken
 */
export const requireAdmin = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Secure database lookup using PARAMETERIZED QUERY to prevent SQL Injection
    const result = await db.query(
      'SELECT is_admin FROM users WHERE id = $1 LIMIT 1',
      [req.user.id]
    );

    const user = result.rows[0];

    // Explicitly verify the boolean flag is true
    if (!user || user.is_admin !== true) {
      return res.status(403).json({ error: 'Forbidden: Admin access required' });
    }

    next();
  } catch (error) {
    console.error('Error verifying admin status');
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
