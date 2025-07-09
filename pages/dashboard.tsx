import React from "react";
import { useAuth } from "../hooks/AuthContext";
import { useRouter } from "next/router";

function Dashboard() {
const {isAuthenticated, user} = useAuth(); 
const router = useRouter(); // Use Next.js router for navigation
  // now replaced with use 

  if (!isAuthenticated) {
    return (
    <p>You must be signed in to view this page.</p>
    // add a button here user is redirected to sign in page. 
    )
    
  }

  return (
    <div>
      <h1>Welcome to your dashboard!</h1>
      <p>User: {user?.email}
      </p>
      <button onClick={() => router.push("/admin") }> Create Event/Update New Event </button>
    </div>
  );
}

// might need to change where the user gets pushed to to create/update event. 

export default Dashboard;