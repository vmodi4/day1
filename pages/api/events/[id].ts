import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../data/supabase"; // Import your Supabase client

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
        const { data: event, error: getError } = await supabase
          .from("events(Vignesh)")
          .select("*")
          .eq("id", event_id)
          .single();
        
        const {data: ticket_data, error: getError2} = await supabase
          .from("event_ticket_types")
          .select(` event_ticket_id,
    event_id,
    price,
    total_quantity,
    available_quantity,
    ticket_types (types) -- Join with ticket_categories to get the ticket type name`)
          .eq("event_id", event_id);

        if(getError2) {
          console.error("Error fetching ticket types:", getError2);
          return res.status(404).json({ message: "Ticket types not found." });
        }

        if (getError) {
          console.error("Error fetching event:", getError);
          return res.status(404).json({ message: "Event not found." });
        }

        console.log("Event fetched:", event);
        console.log("Ticket types fetched:", ticket_data);
        //return res.status(200).json(event);
        return res.status(200).json({ event, ticket_data });

      case "DELETE":
        // Handle DELETE request
        const { error: deleteError } = await supabase
          .from("events")
          .delete()
          .eq("id", event_id);

        if (deleteError) {
          console.error("Error deleting event:", deleteError);
          return res.status(404).json({ message: "Event not found." });
        }

        console.log("Event deleted:", event_id);
        return res.status(200).json({ message: "Event deleted successfully." });

      case "PUT":
        // Handle PUT request
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

        const { data: updatedEvent, error: updateError } = await supabase
          .from("events")
          .update(updateFields)
          .eq("id", event_id)
          .select("*")
          .single();

        if (updateError) {
          console.error("Error updating event:", updateError);
          return res.status(404).json({ message: "Event not found." });
        }

        console.log("Event updated:", updatedEvent);
        return res.status(200).json({ message: "Event updated successfully.", event: updatedEvent });

      default:
        // Handle unsupported methods
        res.setHeader("Allow", ["GET", "DELETE", "PUT"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(`Error handling ${req.method} request:`, error);
    return res.status(500).json({ message: "Internal server error." });
  }
}