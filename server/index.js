import express from 'express';
import cookieParser from 'cookie-parser';
import apiRoutes from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

// Mount the API routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error');
  // Never leak error details or stack traces to the client
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
