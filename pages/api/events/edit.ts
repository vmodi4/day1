// this is where the create/update/delete api requests will be handled 

// create - post request to the database- add another record(all fields will be requried)

import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../data/db"; // Import your database connection
import { eventTable } from "../../../data/schema"; // Import your events table schema
import { eq } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, description, subtitle, event_date, start_datetime, end_datetime, price, image_url_2 } = req.body;

    // Validate required fields
    if (!name || !description || !subtitle || !event_date || !start_datetime || !end_datetime || !price || !image_url_2) {
      return res.status(400).json({ message: "All fields are required." });
    }

    try {
      // Insert the new event into the database
      const newEvent = await db.insert(eventTable).values({
        name,
        description,
        subtitle,
        event_date,
        start_datetime,
        end_datetime,
        price,
        image_url_2,
      });

      res.status(201).json({  event: newEvent });
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }


  // going to put delete next since it will be easier to implement. 

  // can't do else if since the previous statement has an else statement. 

  
        
}
  
