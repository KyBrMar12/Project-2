import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { Client } from "pg"; // PostgreSQL Client to create DB if missing

dotenv.config();

const databaseName = process.env.DB_NAME || "BookIt";
const databaseUser = process.env.DB_USER || "postgres";
const databasePassword = process.env.DB_PASSWORD || "";
const databaseHost = process.env.DB_HOST || "localhost";
const isProduction = process.env.NODE_ENV === "production"; // Detect if we're in a production environment

// First, create a connection to PostgreSQL (without a specific DB)
const client = new Client({
  user: databaseUser,
  password: databasePassword,
  host: databaseHost,
  port: 5432, // Default PostgreSQL port
  ssl: isProduction ? {
    rejectUnauthorized: false, // Allows self-signed certificates (use true for production)
  } : false, // Disable SSL in development environment
});

const sequelize = new Sequelize(databaseName, databaseUser, databasePassword, {
  host: databaseHost,
  dialect: "postgres",
  logging: false, // Disable SQL logging in console for cleaner output
  dialectOptions: {
    ssl: isProduction ? {
      require: true, // Enforces SSL connection
      rejectUnauthorized: false, // Allows connections with invalid/unverified certificates (use true in production)
    } : false, // Disable SSL in development environment
  },
});

// Ensure database exists before connecting with Sequelize
const ensureDatabaseExists = async () => {
  try {
    await client.connect();
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${databaseName}'`);

    if (res.rowCount === 0) {
      console.log(`Database "${databaseName}" not found. Creating...`);
      await client.query(`CREATE DATABASE "${databaseName}"`);
      console.log(`✅ Database "${databaseName}" created successfully.`);
    } else {
      console.log(`✅ Database "${databaseName}" already exists.`);
    }
  } catch (error) {
    console.error("❌ Error checking/creating database:", error);
  } finally {
    await client.end(); // Close the connection
  }
};

ensureDatabaseExists().then(() => {
  sequelize
    .authenticate()
    .then(() => console.log(`🚀 Connected to PostgreSQL database: ${databaseName} -- isProduction ${isProduction}`))
    .catch((err) => console.error("❌ Unable to connect to the database:", err));
});

export default sequelize;
