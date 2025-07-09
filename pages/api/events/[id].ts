import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../data/db";
import { eventTable } from "../../../data/schema";
import { eq } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ message: "Invalid event ID." });
  }

  const event_id = parseInt(id as string);

  try {
    switch (req.method) {
      case "GET":
        // Handle GET request
        const event = await db.select().from(eventTable).where(eq(eventTable.id, event_id));
        console.log("Event fetched:", event);

        if (event.length === 0) {
          return res.status(404).json({ message: "Event not found." });
        }

        return res.status(200).json(event[0]);

      case "DELETE":
        // Handle DELETE request
        const deletedEvent = await db.delete(eventTable).where(eq(eventTable.id, event_id));
        console.log("Event deleted:", deletedEvent);

        if (deletedEvent.oid != null) {
          return res.status(200).json({ message: "Event deleted successfully." });
        } else {
          return res.status(404).json({ message: "Event not found." });
        }

        case "PUT": 

        const body = req.body;

        const updateFields = Object.entries(body).reduce((acc, [key, value]) => {
            if (value !== null && value !== undefined && value !== "") {
              acc[key] = value; // Include only non-empty fields
            }
            return acc;
          }, {} as Record<string, any>);
        
          if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "No valid fields provided for update." });
          }
        
          const updatedEvent = await db.update(eventTable)
            .set(updateFields)
            .where(eq(eventTable.id, event_id));
        
          if (updatedEvent) {
            return res.status(200).json({ message: "Event updated successfully.", event: updatedEvent });
          } else {
            return res.status(404).json({ message: "Event not found." });
        }

        // then we will filter(no need for every field to be required)

      default:
        // Handle unsupported methods
        res.setHeader("Allow", ["GET", "DELETE,"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(`Error handling ${req.method} request:`, error);
    return res.status(500).json({ message: "Internal server error." });
  }
}