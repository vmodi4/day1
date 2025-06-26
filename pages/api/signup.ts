import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import db from "../../data/db";
import { userTable } from "../../data/schema"
import { eq } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { username, password, email } = req.body;

    // Validate request body
    if (!username || !password || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // check if user already exists, we need an if else statement
    const existingUser = await db.select().from(userTable).where(eq(userTable.email, email)).limit(1);

    if(existingUser.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }
    
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user data into the database using Drizzle
      const newUser = await db.insert(userTable).values({
        username,
        email,
        password: hashedPassword,
        created_at: new Date(),
      }).returning();

      // Respond with the inserted user data
      res.status(200).json({ message: "User added successfully!", user: newUser[0] });
    } catch (error) {
      console.error("Error inserting user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}