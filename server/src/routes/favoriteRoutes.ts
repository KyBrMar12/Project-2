import express from 'express';
import Favorite from '../models/Favorite';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { bookId } = req.body;
    const favorite = await Favorite.create({ userId: req.user.userId, bookId });
    res.json(favorite);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add favorite' });
  }
});

export default router;
