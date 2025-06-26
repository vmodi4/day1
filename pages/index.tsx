import EventCard from "../components/EventCard";
import { useState, useEffect } from "react";

import "../css/index.module.css"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {useAuth} from "../hooks/AuthContext"; // Custom hook for authentication context
import {Event} from "../components/EventCard"; // Import the EventCard component


 // Import your events data


import {useCart} from "../hooks/CartContext"; // Custom hook for cart functionality



function Home() {
  
  const [searchQuery, setSearchQuery] = useState("");
  const Cart = useCart(); 
  const[events, setEvents] = useState<Event[]>([]); // Initialize events state as an empty array
  // holding array of objects for events; 
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events/events", {
          method: "GET",
        });

        if (response.ok) {
          const data: Event[] = await response.json();
          setEvents(data); // Set events state
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);
  // empty dependency array means this effect runs once when the component mounts
  

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );
  // I need to break it down even mor

  return (
    <div className="home">
      <h1>Chi-Event Ticketing App</h1>
      <input
        type="text"
        placeholder="Search for events..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="event-grid">
        {filteredEvents.map((event) => (
          <EventCard event={event} key={event.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;

// 