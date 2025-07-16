// Create a GET request handler to fetch the events from the database

import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../data/supabase"; // Import your Supabase client

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      // Fetch events from the Supabase database
      const { data: events, error } = await supabase
        .from("events(Vignesh)") // Replace "events" with your actual table name in Supabase
        .select("*"); // Select all columns

      if (error) {
        console.error("Error fetching events:", error);
        return res.status(500).json({ message: "Failed to fetch events." });
      }

      // Respond with the events
      res.status(200).json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}