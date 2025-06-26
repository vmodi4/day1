import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";

function Admin() {
    return (
        <ProtectedRoute>
            <div className="admin-page">
                <h1>Admin Dashboard</h1>
                <p>Welcome to the admin dashboard!</p>
                {/* Add more admin functionalities here */}
            </div>
        </ProtectedRoute>
    )
}

export default Admin; 

// Admin page will allow for the creation of events(which will then be posted to the database)