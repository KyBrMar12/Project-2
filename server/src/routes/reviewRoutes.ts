import express from 'express';
import Review from '../models/Review';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { bookId, rating, comment } = req.body;
    const review = await Review.create({ userId: req.user.userId, bookId, rating, comment });
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add review' });
  }
});

export default router;
