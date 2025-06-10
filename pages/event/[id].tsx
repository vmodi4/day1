import React from "react";
import { useRouter } from "next/router";
import events from "../../data"; // Import your events data
import "../../css/id.module.css";
import Image from "next/image"; // Use Next.js Image component for optimized images
import {useCart} from "../../hooks/CartContext"; // Custom hook for cart functionality

function IndividualEventPage() {
  const router = useRouter();
  const Cart = useCart(); 
  // created own cart hook
  const {id} = router.query // Get the event ID from the routeconsole.log("Event Id from url: ", id); // Log the event ID
  const event = events.find((event) => event.id === parseInt(id as string)); // Find the event by ID

  if(!event) {
    return <p>event not found</p>
  }
 
  

  return (
    <div className="individual-event-page">
      <h1>{event.title}</h1> 
      <Image src={event.url} alt={event.title} width = {600} height = {400} />
      <p>{event.description}</p>
      <p>Location: {event.location}</p>
      <p>Time: {event.time}</p>
      <p>Price: {event.price}</p>
      <button onClick={() => Cart.add(event)}>Add to Cart</button>
    </div>
  );
}

export default IndividualEventPage;