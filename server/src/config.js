import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/qa-portfolio',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173'
};
