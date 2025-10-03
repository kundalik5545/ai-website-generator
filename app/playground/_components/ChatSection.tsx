import React from "react";
import { Messages } from "../[projectId]/page";

type props = { messages: Messages[] };

const ChatSection = ({ messages }: props) => {
  return (
    <div className="p-5 w-96 shadow h-[94vh]">
      {/* Message Section */}

      {/* Footer Input */}
    </div>
  );
};

export default ChatSection;
