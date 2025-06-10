import React from "react";

import {useRouter} from "next/router"; // Use Next.js router for navigation
import events from "../data"; 
import {useCart} from "../hooks/CartContext"; // Custom hook for cart functionality

// create an arrow function to handle the click event


function EventCard({event}: {event: any}) {
    const Cart = useCart(); // Use the custom cart hook
  
    const router = useRouter(); // Use Next.js router for navigation
    const handleMoreInfo = () => {
        router.push(`/event/${event.id}`); // Navigate to the individual event page
      };
    
    return (
    
    <div className="event-card">
      <div className="event-image">
        <img src={event.url} alt={event.title} />
      </div>
      <div className="event-info">
        <h3>{event.title}</h3>
        <p>Price of Event: {event.price}</p>
        <div className="event-buttons">
          <button onClick={() => Cart.add(event)}>Add to Cart</button>
          <button onClick={handleMoreInfo}>More Info</button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;