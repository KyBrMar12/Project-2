import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Query parameter is required' });

    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching books from Google API:", error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

export default router;
