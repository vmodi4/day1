// create a get request handler to fetch the events from the database

import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../data/db";
import { eventTable } from "../../../data/schema";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // verfiies the request method. 
    try {
      // Simulate fetching events from a database
      const events = await db.select().from(eventTable)
   
      // this creates an array of event objects, where each object represents a row
      // that has all the event properties. 
        

      // Respond with the events
      res.status(200).json(events);
    } catch (error) {
      console.error("Error fetching even:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}