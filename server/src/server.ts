import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/connection";
import authRoutes from "./routes/authRoutes";
import bookRoutes from "./routes/bookRoutes";
import favoriteRoutes from "./routes/favoriteRoutes";
import reviewRoutes from "./routes/reviewRoutes";

dotenv.config();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://team-book-it-993b.onrender.com"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/reviews", reviewRoutes);

const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
