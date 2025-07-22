import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { supabase } from "../../data/supabase"; // Import your Supabase client

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { username, password, email } = req.body;

    // Validate request body
    if (!username || !password || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      // Check if user already exists
      const { data: existingUser, error: fetchError } = await supabase
        .from("usersVig") // Replace "users" with your actual table name in Supabase
        .select("id")
        .eq("email", email)
        .single(); // Ensure only one user is returned

      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      if (fetchError && fetchError.code !== "PGRST116") { // Ignore "No rows found" error
        console.error("Error checking existing user:", fetchError);
        return res.status(500).json({ message: "Internal server error" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user data into the database using Supabase
      const { data: newUser, error: insertError } = await supabase
        .from("usersVig") // Replace "users" with your actual table name in Supabase
        .insert([
          {
            username,
            email,
            password: hashedPassword,
            
          },
        ])
        .select("*")
        .single(); // Ensure only one user is returned

      if (insertError) {
        console.error("Error inserting user:", insertError);
        return res.status(500).json({ message: "Failed to add user" });
      }

      // Respond with the inserted user data
      res.status(200).json({ message: "User added successfully!", user: newUser });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}