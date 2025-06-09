import EventCard from "../components/EventCard";
import { useState } from "react";
import events from "../data"
import "../css/index.css";
import useCart from "../hooks/useCart"; // Custom hook for cart functionality

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const Cart = useCart(); 

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

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