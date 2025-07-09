import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import db from "../../data/db";
import { userTable } from "../../data/schema";
import { eq } from "drizzle-orm";
import "dotenv/config"; // Load environment variables from .env file
import jwt from "jsonwebtoken"; // Import JSON Web Token library

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { password, email, role } = req.body; // Extract email and password from request body

    // Validate request body
    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }

    try {
      // Retrieve user data from the database
      const user = await db
        .select({ email: userTable.email, password: userTable.password, id: userTable.id, role: userTable.role })
        .from(userTable)
        .where(eq(userTable.email, email as string))
        .limit(1);

      // Check if user exists
      if (user.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const existingUser = user[0];

      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password as string, existingUser.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Generate a JWT token
      const token = jwt.sign(
        { id: existingUser.id, email: existingUser.email, role: existingUser.role}, // Payload
        process.env.JWT_SECRET!, // Secret key
        { expiresIn: "4h" } // Token expiration
      );

      // Set the token in an HTTP-only cookie
      res.setHeader(
        "Set-Cookie",
        `token=${token}; HttpOnly; Path=/; Max-Age=14400; SameSite=Strict`
      );
      console.log("Cookie set:", `token=${token}`); // Debugging: Log the cookie

      // Respond with success message
      return res.status(200).json({
        message: "Sign-in successful",
        token, // Optional: Include token in response for debugging purposes
      });
    } catch (error) {
      console.error("Error during sign-in:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}