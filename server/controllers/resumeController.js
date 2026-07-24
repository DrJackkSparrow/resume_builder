import { db } from '../db/index.js';

/**
 * Controller to handle fetching a user's resume data
 */
export const getResume = async (req, res) => {
  try {
    // SECURITY MANDATE: Extract user ID from the VERIFIED token payload (req.user), 
    // NEVER from req.body or req.query to prevent authorization bypass.
    const userId = req.user.id;

    // SECURITY MANDATE: Use explicit parameterized queries to prevent SQL Injection
    // The database engine parses the query and parameters separately.
    const result = await db.query(
      'SELECT resume_data FROM resumes WHERE user_id = $1 LIMIT 1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    return res.status(200).json({ data: result.rows[0].resume_data });
  } catch (error) {
    console.error('Error fetching resume');
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
