import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const client = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_ID || 'dummy-client-id');
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-development-key';

export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    // Verify the Google ID Token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.VITE_GOOGLE_CLIENT_ID || 'dummy-client-id',
    });
    
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    
    // In a real app, you would upsert the user into your database here
    // e.g., db.query('INSERT INTO users (google_id, email, name) VALUES ($1, $2, $3) ON CONFLICT DO UPDATE...', [userid, payload.email, payload.name])

    // Generate our own secure JWT
    const appToken = jwt.sign(
      { 
        id: userid,
        email: payload.email,
        isAdmin: false
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Set it as an HttpOnly cookie
    res.cookie('unformat_jwt', appToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    res.status(200).json({ 
      message: 'Successfully authenticated with Google',
      user: {
        email: payload.email,
        name: payload.name,
        picture: payload.picture
      }
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(401).json({ error: 'Invalid Google token' });
  }
};
