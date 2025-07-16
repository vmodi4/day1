import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../data/supabase"; // Adjust the import based on your setup

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { requesterId, requesteeId, status } = req.body;

    try {
      // Insert a new friendship record into the "friendships" table
      const { data, error } = await supabase
        .from("friendships")
        .insert([{ requester_id: requesterId, requestee_id: requesteeId, status }]);

      if (error) {
        console.error("Error creating friendship:", error);
        return res.status(500).json({ message: "Failed to create friendship." });
      }

      return res.status(201).json({ message: "Friendship request created successfully.", data });
    } catch (error) {
      console.error("Unexpected error:", error);
      return res.status(500).json({ message: "An unexpected error occurred." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}