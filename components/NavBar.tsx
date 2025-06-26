import React from "react";
import Link from "next/link";
import { useAuth } from "../hooks/AuthContext";
import { useCart } from "../hooks/CartContext";

function NavBar() {
  const { isAuthenticated } = useAuth();
  
  const Cart = useCart();

  const logout = () => {
    console.log("Logout function called");
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
            <Link href = "/filtered" > Filter</Link>
          </>
        ) : (
        <div>
          <button onClick={logout} className="nav-link">Sign Out</button>
          <Link href="/admin" className="nav-link">Admin</Link>
        </div>
        )}
        
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