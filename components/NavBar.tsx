import Link from "next/link";
import "../css/NavBar.css";
import useCart from "../hooks/useCart"; 



function NavBar() {

    const Cart = useCart(); 
  

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link href="/">Chi-Event App</Link>
            </div>
            <div className="navbar-links">
                <Link href="/" className="nav-link">Home</Link>
                <Link href="/cart" className="nav-link">
                    Cart(
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