import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "@/components/NavBar"; // Import your NavBar component
import { CartProvider } from "@/hooks/CartContext";
import { AuthProvider } from "@/hooks/AuthContext"; // Import your AuthProvider
import {SnackbarProvider} from "notistack"




export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
    <AuthProvider>
    <CartProvider>
      <NavBar /> {/* Gloabal Navbar */}
      <main>
        <Component {...pageProps} /> {/* Render the current page */}
      </main>
      </CartProvider>
      </AuthProvider>
    </SnackbarProvider>
    </>
  );
}