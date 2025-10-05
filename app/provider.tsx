"use client";
/**
 * This provider is used to create a new user in the database
 * when a user signs in for the first time using Clerk.
 */

import { UserDetailContext } from "@/context/UserDetailContext";
import { OnSaveContext } from "@/context/OnSaveContext";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // user from clerk useUser hook
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState<any>();
  const [onSaveData, setOnSaveData] = useState<any>(null);
  //   call create user on page load
  useEffect(() => {
    user && createNewUser();

    return () => {};
  }, [user]);

  // Logic to create a new user in the database
  const createNewUser = async () => {
    const result = await axios.post("/api/users", {});
    setUserDetails(result.data?.user);
  };

  return (
    <div>
      <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
        <OnSaveContext.Provider value={{ onSaveData, setOnSaveData }}>
          {children}
        </OnSaveContext.Provider>
      </UserDetailContext.Provider>
    </div>
  );
};

export default Provider;
