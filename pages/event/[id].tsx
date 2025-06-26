import React from "react";
import { useRouter } from "next/router";
import {Event} from "../../components/EventCard"; // this is just importing the interface(not the actual events)

import "../../css/id.module.css";
import Image from "next/image"; // Use Next.js Image component for optimized images
import {useCart} from "../../hooks/CartContext"; // Custom hook for cart functionality
import db from "../../data/db"; // Import your events data
import {eventTable} from "../../data/schema"; // Import your schema for validation
import { useEffect, useState } from "react";
import {eq} from "drizzle-orm"; // Import eq for querying the database
import axios from "axios"; // Import axios for making HTTP requests
import {useAuth} from "../../hooks/AuthContext"; // Custom hook for authentication context

function IndividualEventPage() {
  const router = useRouter();
  const Cart = useCart(); 
  const {isAuthenticated, user} = useAuth(); // Use the custom authentication hook
  // created own cart hook
  const {id} = router.query
  const event_id = parseInt(id as string); 

  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError]  = useState<string | null>(null); // State to hold the event data(using Event interface)
 
  // Fetch events from the database using the ID
  useEffect(() => {
    const fetchEvent = async () => {
      if (!id || !isAuthenticated) return; // Ensure ID is available before fetching

      try {
        const response = await axios.get(`/api/events/${id}`); 
        // trying axios. 
        setEvent(response.data); // Set the event data to state
        console.log(response.data)
      } catch (err: any) {
        console.error("Error fetching event:", err);
        setError(err.response?.data?.message || "Failed to fetch event");
      }
    };

    fetchEvent();
  }, [id]);


 

  if(!event) {
    return <p>event not found, user is not authenticated</p>
  }


  return (
    <div className="individual-event-page">
      <h1>{event.name}</h1> 
      <p>{event.description}</p>
      <p>Start-Time {event.start_datetime}</p>
      <p>End-Time {event.end_datetime}</p>
      <button onClick={() => Cart.add(event)}>Add to Cart</button>
    </div>
  );
}

export default IndividualEventPage;