import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: 'mongodb://localhost:27017/qa-portfolio',
  corsOrigin: 'http://localhost:5173'
};
