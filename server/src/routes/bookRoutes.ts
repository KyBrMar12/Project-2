import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import Book from "../models/Book";

dotenv.config();
const router = express.Router();

// ✅ Middleware: Log requests for debugging
router.use((req, res, next) => {
  console.log(`📌 [${req.method}] ${req.originalUrl}`);
  next();
});

// ✅ Route to Fetch NYT Best Sellers
router.get("/nyt-bestsellers", async (req, res) => {
  try {
    const apiKey = process.env.NYT_API_KEY;
    console.log("📌 NYT API Key:", apiKey ? "✅ Loaded" : "❌ MISSING");

    if (!apiKey) {
      return res.status(500).json({ error: "NYT API key is missing in environment variables." });
    }

    const nytUrl = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apiKey}`;
    const response = await axios.get(nytUrl);

    if (!response.data.results?.books) {
      console.error("⚠️ Unexpected NYT API response:", response.data);
      return res.status(500).json({ error: "Invalid response from NYT API" });
    }

    // Extract relevant book data
    const books = response.data.results.books.map((book: any) => ({
      title: book.title,
      author: book.author,
      description: book.description,
      image: book.book_image, // NYT book image
      buyLink: book.amazon_product_url, // Amazon purchase link
    }));

    res.json(books.slice(0, 10)); // Return top 10 books
  } catch (error) {
    console.error("❌ Error fetching NYT bestsellers:", error);
    res.status(500).json({ error: "Failed to fetch NYT bestsellers" });
  }
});

// ✅ Fetch Books from Google Books API (Dynamically Searchable)
router.get("/google-books", async (req, res) => {
  try {
    const query = req.query.q as string || "bestsellers";
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    console.log("📌 Google Books API Key:", apiKey ? "✅ Loaded" : "❌ MISSING");

    if (!apiKey) {
      return res.status(500).json({ error: "Google Books API key is missing in environment variables." });
    }

    const maxResults = 12;
    const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}&maxResults=${maxResults}`;
    const response = await axios.get(googleBooksUrl);

    if (!response.data.items) {
      console.warn("⚠️ No books found in Google Books API response.");
      return res.json([]); // Return an empty array if no books found
    }

    console.log(`📚 Fetched ${response.data.items.length} books from Google Books API`);
    res.json(response.data.items);
  } catch (error) {
    console.error("❌ Error fetching books:", error);
    res.status(500).json({ error: "Failed to fetch books from Google Books API" });
  }
});

// ✅ GET all stored books (PostgreSQL)
router.get("/", async (req, res) => {
  try {
    const books = await Book.findAll();
    console.log("📌 Books fetched from database:", books.length);
    res.json(books);
  } catch (error) {
    console.error("❌ Error fetching books:", error);
    res.status(500).json({ error: "Failed to retrieve books" });
  }
});

// ✅ GET a single book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (error) {
    console.error("❌ Error fetching book:", error);
    res.status(500).json({ error: "Failed to retrieve book" });
  }
});

// ✅ POST a new book (Save to PostgreSQL)
router.post("/", async (req, res) => {
  try {
    const { title, author, description, apiId } = req.body;
    if (!title || !author || !apiId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newBook = await Book.create({ title, author, description, apiId });
    console.log("📌 New book added to database:", newBook);
    res.status(201).json(newBook);
  } catch (error) {
    console.error("❌ Error adding book:", error);
    res.status(500).json({ error: "Failed to add book" });
  }
});

// ✅ DELETE a book by ID
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    await book.destroy();
    console.log("📌 Book deleted:", req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting book:", error);
    res.status(500).json({ error: "Failed to delete book" });
  }
});

export default router;
