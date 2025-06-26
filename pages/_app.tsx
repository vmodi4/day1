import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "@/components/NavBar"; // Import your NavBar component
import { CartProvider } from "@/hooks/CartContext";
import { AuthProvider } from "@/hooks/AuthContext"; // Import your AuthProvider


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <AuthProvider>
    <CartProvider>
      <NavBar /> {/* Global NavBar */}
      <main>
        <Component {...pageProps} /> {/* Render the current page */}
      </main>
      </CartProvider>
      </AuthProvider>
    </>
  );
}