import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../data/db";
import { eventTable } from "../../../data/schema";
import { eq } from "drizzle-orm";
// this should be authenticated



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // verfiies the request method. 
    const {id} = req.query; 
    // should be string datatype. 
    const event_id = parseInt(id as string); 
    try {
      // get the id from the "POST" request
      // Simulate fetching events from a database
      const event= await db.select().from(eventTable).where(eq(eventTable.id, event_id));
      console.log("Event fetched:", event);
      // this creates an array of event objects, where each object represents a row
      // that has all the event properties. 
        

      // Respond with the events
      res.status(200).json(event[0]);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

