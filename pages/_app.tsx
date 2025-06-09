import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "@/components/NavBar"; // Import your NavBar component

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar /> {/* Global NavBar */}
      <main>
        <Component {...pageProps} /> {/* Render the current page */}
      </main>
    </>
  );
}