import React from "react";
import Link from "next/link";
import { useAuth } from "../hooks/AuthContext";
import { useCart } from "../hooks/CartContext"; 
import {useRouter} from "next/router"; // Use Next.js router for navigation

function NavBar() {
  const { isAuthenticated, setIsAuthenticated, admin } = useAuth();
  // this state is globally managed. 
  
  const router = useRouter(); 
  const Cart = useCart();

  const logout = async () => {
    try {
      // Call the logout API to clear the cookie
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include", // Ensure cookies are sent with the request
      });
  
      // Set the authenticated state to false
      setIsAuthenticated(false);
  
      // Redirect to the home page
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link href="/">Chi-Event App</Link>
      </div>
      <div className="navbar-links">
        
        <Link href="/" className="nav-link">Home</Link>
        {!isAuthenticated ? (
          <>
            <Link href="/signup" className="nav-link">Sign Up</Link>
            <Link href="/signin" className="nav-link">Sign In</Link>
            
          </>
        ) : (
        <div>
          <button onClick={logout} className="nav-link">Sign Out</button>
          
        </div>
        )}
        
        {admin && isAuthenticated  &&(<Link href="/admin" className="nav-link">Admin</Link>)}
        
        
        <Link href="/cart" className="nav-link">
          Cart (
          {Cart.getTotalItems() > 0 && (
            <span className="cart-count">{Cart.getTotalItems()}</span>
          )}
          )
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;