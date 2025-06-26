import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import "dotenv/config"; // Load environment variables from .env file

const pool = new Pool({
  user: process.env.PG_USER, // PostgreSQL username
  host: process.env.PG_HOST, // Host where PostgreSQL is running
  database: process.env.PG_DATABASE, // Name of your database
  password: process.env.PG_PASSWORD, // PostgreSQL password
  port: parseInt(process.env.PG_PORT || "5432"), // Default PostgreSQL port
});

 const db = drizzle(pool); // Create Drizzle instance
 export default db; 