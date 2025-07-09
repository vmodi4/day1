// create a protected route component that can be wrapped around the admin page. 
import React from "react";
import { useAuth } from "../hooks/AuthContext";
import { useRouter } from "next/router";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, setAdmin } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated || !setAdmin) {
      router.push("/signin"); // Redirect non-admin users to the sign in page. 
    }
  }, [isAuthenticated, setAdmin, router]);

  if (!isAuthenticated || !setAdmin) {
    return <p>Loading...</p>; // Show loading state while redirecting
  }

  return <>{children}</>; // Render the protected content for admin users
};

export default AdminRoute;
