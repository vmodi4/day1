import React from "react";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


import {useRouter} from "next/router"; // Use Next.js router for navigation

import {useCart} from "../hooks/CartContext"; // Custom hook for cart functionality
import {useAuth} from "../hooks/AuthContext"; // Custom hook for authentication context

// create an arrow function to handle the click event
export interface Event {
    id: number;
    name: string;
    description: string;
    subtitle: string;
    event_date: string; 
    start_datetime: string;
    end_datetime: string;
    price: string; 
    image_url_2: string; // Assuming url is a string for the image



}

function EventCard({event}: {event: Event}) {
    const Cart = useCart(); // Use the custom cart hook
    const {isAuthenticated, user} = useAuth(); 
  
    const router = useRouter(); // Use Next.js router for navigation
    const handleMoreInfo = () => {
        router.push(`/event/${event.id}`); // Navigate to the individual event page
      };
    
    return (
        <Card sx={{ maxWidth: 345, margin: "1rem" }}>
        {/* Event Image */}
        <CardMedia
          component="img"
          height="140"
          image={event.image_url_2}
          alt={event.name}
        />
        {/* Event Content */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {event.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {event.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Location: {event.subtitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Start-Time: {event.start_datetime.toString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            End-Time: {event.end_datetime.toString()}
          </Typography>
        </CardContent>
        {/* Action Buttons */}
        {isAuthenticated && (
  <CardContent>
    <Button
      variant="contained"
      color="primary"
      sx={{ marginRight: "0.5rem" }}
      onClick={() => Cart.add(event)}
    >
      Add to Cart
    </Button>
    <Button variant="outlined" color="secondary" onClick={handleMoreInfo}>
      More Info
    </Button>
  </CardContent>
)}
      </Card>
   
  );
}
// need to add back the onClick event for both buttons: AddtoCard and handleMoreInfo. 
export default EventCard;


