import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { supabase } from "../../data/supabase"; // Import your Supabase client

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("Cookies:", req.cookies); // Debugging: Log all cookies
    const token = req.cookies.token;

    if (!token) {
      console.log("Token is missing"); // Debugging: Log missing token
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Decode the token without verification
    const decodedWithoutVerification = jwt.decode(token);
    console.log("Decoded token (without verification):", decodedWithoutVerification);

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; email: string; role: string };
    console.log("Verified token:", decoded); // Debugging: Log the verified token

    // Fetch user details from Supabase
    const { data: user, error } = await supabase
      .from("users(Vignesh)") // Replace "users" with your actual table name in Supabase
      .select("id, username, email, role") // Select only the required fields
      .eq("id", decoded.id)
      .single(); // Ensure only one user is returned

    if (error) {
      console.error("Error fetching user from Supabase:", error);
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with user information
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error verifying token:", error); // Debugging: Log the error
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}