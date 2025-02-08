import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/database';
import authRoutes from './routes/authRoutes';
import bookRoutes from './routes/bookRoutes';
import reviewRoutes from './routes/reviewRoutes';
import favoriteRoutes from './routes/favoriteRoutes';
import recommendationRoutes from './routes/recommendationRoutes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/recommendations', recommendationRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
