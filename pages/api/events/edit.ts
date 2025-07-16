// This is where the create/update/delete API requests will be handled

import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../data/supabase"; // Import your Supabase client

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, description, subtitle, event_date, start_datetime, end_datetime, price, image_url_2 } = req.body;

    // Validate required fields
    if (!name || !description || !subtitle || !event_date || !start_datetime || !end_datetime || !price || !image_url_2) {
      return res.status(400).json({ message: "All fields are required." });
    }

    try {
      // Insert the new event into the database using Supabase
      const { data: newEvent, error } = await supabase
        .from("events") // Replace "events" with your actual table name in Supabase
        .insert([
          {
            name,
            description,
            subtitle,
            event_date,
            start_datetime,
            end_datetime,
            price,
            image_url_2,
          },
        ])
        .select("*") // Return the inserted record
        .single(); // Ensure a single record is returned

      if (error) {
        console.error("Error creating event:", error);
        return res.status(500).json({ message: "Failed to create event." });
      }

      res.status(201).json({ event: newEvent });
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}