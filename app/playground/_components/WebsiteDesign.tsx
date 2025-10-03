import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import React from "react";

const WebsiteDesign = () => {
  return (
    <div className="flex-1 p-5">
      Website Design section
      <div className="">
        <div className="max-w-xs mx-auto my-4">
          <Card className="flex items-end p-2 rounded-lg shadow">
            <Avatar className="w-10 h-10 rounded-full">
              <AvatarImage src="/avatar.png" alt="user avatar" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <div className="ml-3 flex flex-col space-y-1 w-full">
              <div className="bg-white rounded-lg shadow p-3">
                <p className="text-sm text-gray-900">
                  Hey there! This is a WhatsApp‑style message bubble.
                </p>
              </div>
              <span className="text-xs text-gray-500 text-right">12:45 PM</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WebsiteDesign;
