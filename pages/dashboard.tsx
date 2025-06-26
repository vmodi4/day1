import React from "react";
import { useAuth } from "../hooks/AuthContext";

function Dashboard() {
const {isAuthenticated, user} = useAuth(); 
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
      <p>User: {user?.email}</p>
    </div>
  );
}

export default Dashboard;