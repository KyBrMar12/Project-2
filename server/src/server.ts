import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/connection";
import authRoutes from "./routes/authRoutes";
import bookRoutes from "./routes/bookRoutes";
import favoriteRoutes from "./routes/favoriteRoutes";
import reviewRoutes from "./routes/reviewRoutes";

dotenv.config();
console.log("📌 Loaded JWT_SECRET:", process.env.JWT_SECRET); // ✅ Debugging log

const app = express();

// ✅ Allow both local development and deployed frontend on Render
const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://team-book-it-993b.onrender.com", // Deployed frontend on Render
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true // Allows sending cookies (if needed)
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/reviews", reviewRoutes);

const PORT = process.env.PORT || 5000;

// ✅ Ensure database connection before starting the server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch(error => {
  console.error("❌ Database connection failed:", error);
});
