import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import Favorite from "../models/Favorite";
import authMiddleware, { AuthenticatedRequest } from "../middlewares/authMiddleware"; // ✅ Import correctly

dotenv.config();

const router = express.Router();
const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

// ✅ Add a favorite book
interface AddFavoriteRequestBody {
  bookId: string;
}

interface FavoriteResponse {
  userId: string;
  bookId: string;
}

router.post("/", authMiddleware, async (req: AuthenticatedRequest, res: express.Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const { bookId }: AddFavoriteRequestBody = req.body;

    if (!bookId) {
      return res.status(400).json({ error: "bookId is required" });
    }

    // Check if the book is already in the user's favorites
    const existingFavorite = await Favorite.findOne({
      where: { userId: req.user.userId, bookId }
    });

    if (existingFavorite) {
      return res.status(400).json({ error: "Book is already in favorites" });
    }

    const favorite: FavoriteResponse = await Favorite.create({
      userId: req.user.userId,
      bookId
    });

    res.status(201).json(favorite);
  } catch (error) {
    console.error("❌ Error adding favorite:", error);
    res.status(500).json({ error: "Failed to add favorite" });
  }
});

// ✅ Get all favorite books for the authenticated user
router.get("/", authMiddleware, async (req: AuthenticatedRequest, res: express.Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const favorites = Favorite.findAll({ where: { userId: req.user.userId } }) as unknown as { bookId: string }[];

    // Fetch book details from Google Books API for each favorite
    const favoriteBooks = await Promise.all(
      favorites.map(async (favorite: { bookId: string }) => {
        try {
          const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${favorite.bookId}`, {
            params: {
              key: GOOGLE_BOOKS_API_KEY
            }
          });
          return response.data;
        } catch (error) {
          console.error(`❌ Error fetching book details for bookId ${favorite.bookId}:`, error);
          return null;
        }
      })
    );

    // Filter out any null values (in case of errors)
    const validFavoriteBooks = favoriteBooks.filter((book: null) => book !== null);

    res.json(validFavoriteBooks);
  } catch (error) {
    console.error("❌ Error fetching favorites:", error);
    res.status(500).json({ error: "Failed to retrieve favorites" });
  }
});

export default router;