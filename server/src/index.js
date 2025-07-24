import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from './config.js';
import projectRoutes from './routes/projects.js';

const app = express();

app.use(cors());
app.use(express.json());

// 🔗 Route registrations
app.use('/api/projects', projectRoutes);

// 🧠 MongoDB connection
mongoose.connect(config.mongoUri)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(config.port, () => {
      console.log(`Server running at http://localhost:${config.port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });
