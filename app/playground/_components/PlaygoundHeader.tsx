import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const PlaygoundHeader = () => {
  return (
    <div className="flex items-center justify-between p-2 shadow-sm">
      <Image src={"/logo.svg"} width={35} height={35} alt="logo" />
      <Button>Save</Button>
    </div>
  );
};

export default PlaygoundHeader;
