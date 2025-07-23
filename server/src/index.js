import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config.js';
import consultancyRoutes from '../../client/src/routes/consultancy.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/consultancy', consultancyRoutes);

mongoose.connect(config.mongoUri)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(config.port, () => {
      console.log(`Server running on http://localhost:${config.port}`);
    });
  })
  .catch((err) => console.error('MongoDB error:', err));