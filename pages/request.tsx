// we also have to authenticate this user and personalize the screen for them. 

// this is where I will create a post request to make a record in the friendship database, and then there can th

import React, { useState, useEffect } from "react";

import {useAuth} from "../hooks/AuthContext"; // Custom hook for authentication context
import { useRouter } from "next/router"; // Use Next.js router for navigation

interface User {
  id: number;
  username: string;
  email: string;
}

function SearchUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  // State to manage loading state

  const router = useRouter(); 

  const {isAuthenticated, loading} = useAuth(); // Use the custom authentication hook   

  console.log("This is the isAuthenticated value: " + isAuthenticated);
  
    useEffect(() => {
       if(!isAuthenticated && !loading) {
        router.push("/signin"); // Redirect to sign in page if not authenticated
       }
    }, [loading, isAuthenticated, router]);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const sendFriendRequest = (username: string) => {
    console.log(`Friend request sent to ${username}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().startsWith(search.toLowerCase()) // Access email for each user
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={handleSearch}
      />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            {user.username} ({user.email})
            <button onClick={() => sendFriendRequest(user.username)}>Add Friend</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchUsers;