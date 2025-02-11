import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// ✅ Debugging: Log DB_URL to check if it's being read
console.log("🔍 DB_URL:", process.env.DB_URL || "❌ NOT FOUND");

const sequelize = new Sequelize(process.env.DB_URL as string, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

async function checkConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection has been established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
}

checkConnection();

export default sequelize;
