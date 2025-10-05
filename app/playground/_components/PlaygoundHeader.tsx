import { Button } from "@/components/ui/button";
import { OnSaveContext } from "@/context/OnSaveContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PlaygoundHeader = () => {
  const { onSaveData, setOnSaveData } = React.useContext(OnSaveContext);

  return (
    <div className="flex items-center justify-between p-2 shadow-sm">
      <Link href="/" className="flex items-center gap-2 font-bold">
        <Image src={"/logo.svg"} width={35} height={35} alt="logo" />
        Ai Website Generator
      </Link>
      <Button onClick={() => setOnSaveData(Date.now())}>Save</Button>
    </div>
  );
};

export default PlaygoundHeader;
