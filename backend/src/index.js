  import express from 'express';
  import dotenv from 'dotenv';
  import connectDB from './lib/db.js';
  import authRoutes from './routes/auth.routes.js';
  import applicationRoutes from './routes/application.router.js';
  import cookieParser from 'cookie-parser';
  import cors from 'cors';

  dotenv.config();

  const app = express();


  // Connect to MongoDB
  connectDB();

  // Middleware
  app.use(express.json());
  app.use(cookieParser());

  const allowedOrigins = [
    'http://localhost:4200',
    'https://YOUR-FRONTEND.netlify.app' // add later
  ];

  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true
    })
  );

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/jobs', applicationRoutes);

  // Start the server
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
