import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.RENDER ? process.env.DB_URL_REMOTE : process.env.DB_URL_LOCAL;

const sequelize = new Sequelize(DB_URL as string, {
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
