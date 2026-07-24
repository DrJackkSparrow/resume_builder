import express from 'express';
import { verifyUserToken, requireAdmin } from '../middleware/auth.js';
import { getResume } from '../controllers/resumeController.js';
import { googleAuth } from '../controllers/authController.js';
import { validateRequest } from '../middleware/validate.js';
import { resumeSchema } from '../schemas/resumeSchema.js';
import { getResume } from '../controllers/resumeController.js';
import { generatePdf } from '../controllers/pdfController.js';
import { upload, uploadAvatar } from '../controllers/uploadController.js';

const router = express.Router();

/**
 * Public Routes
 * (e.g., Auth endpoints that do not require a token)
 */
router.post('/auth/google', googleAuth);
router.get('/health', (req, res) => res.json({ status: 'ok' }));

/**
 * Standard User Routes
 * Protected by verifyUserToken middleware
 */
router.use('/user', verifyUserToken);

// User endpoints
router.get('/user/resume', getResume);
router.post('/user/resume', validateRequest(resumeSchema), (req, res) => res.json({ message: 'Resume updated securely' }));
router.post('/user/pdf/generate', validateRequest(resumeSchema), generatePdf);
router.post('/user/upload/avatar', upload.single('avatar'), uploadAvatar);


/**
 * Admin Routes
 * Protected by BOTH verifyUserToken AND requireAdmin middlewares
 */
router.use('/admin', verifyUserToken, requireAdmin);

// Admin endpoints
router.get('/admin/stats', (req, res) => {
  res.json({ message: 'Admin stats data accessed securely' });
});

export default router;
