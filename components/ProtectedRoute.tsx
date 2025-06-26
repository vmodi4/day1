import React from "react";
import { useAuth } from "../hooks/AuthContext";
import { useRouter } from "next/router";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin"); // Redirect to sign-in page if not authenticated
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <p>Redirecting...</p>; // Optionally show a loading spinner
  }

  return <>{children}</>; // Render the protected content
};

export default ProtectedRoute;
