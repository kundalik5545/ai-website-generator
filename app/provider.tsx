"use client";
import React from "react";
import axios from "axios";

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const createNewUser = async () => {
    // Logic to create a new user in the database
    const result = await axios;
  };

  return <div>{children}</div>;
};

export default Provider;
