"use client";

import React, { useState } from "react";
import { Messages } from "../[projectId]/page";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Send, SendHorizontal } from "lucide-react";

type props = { messages: Messages[]; onSend: any; loading: boolean };

const ChatSection = ({ messages, onSend, loading }: props) => {
  const [input, setInput] = useState<string>("");

  const handleSend = () => {
    if (!input?.trim()) return;
    onSend(input);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[94vh] w-full max-w-md mx-auto bg-background border-r border-t">
      {/* Header */}
      <div className="p-4 border-b bg-card">
        <h2 className="font-semibold text-foreground">Chat</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/20">
        {messages.length === 0 ? (
          <p>No Messages yet.</p>
        ) : (
          <>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] sm:max-w-xs px-3 py-2 rounded-2xl shadow-sm relative ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-card text-card-foreground rounded-bl-md border"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 max-w-[80%] sm:max-w-xs px-3 py-2 rounded-2xl shadow-sm relative bg-card text-card-foreground rounded-bl-md border">
              <Loader2Icon className="animate-spin h-5 w-5 text-muted-foreground" />
              <p className="text-sm whitespace-pre-wrap break-words">
                AI is typing...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-card">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            placeholder="Type a message..."
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 min-h-[40px] max-h-32 p-3 bg-background border border-input rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 placeholder:text-muted-foreground"
            rows={1}
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="rounded-full h-10 w-10 shrink-0"
            disabled={!input?.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
