"use client";
/**
 * This provider is used to create a new user in the database
 * when a user signs in for the first time using Clerk.
 */

import React, { useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // user from clerk useUser hook
  const { user } = useUser();

  //   call create user on page load
  useEffect(() => {
    user && createNewUser();

    return () => {};
  }, [user]);

  // Logic to create a new user in the database
  const createNewUser = async () => {
    const result = await axios.post("/api/users", {});

    console.log(result.data);
  };

  return <div>{children}</div>;
};

export default Provider;
