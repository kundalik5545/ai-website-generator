"use client";
import { aiWebGenPrompt } from "@/prompt/Prompt";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ChatSection from "../_components/ChatSection";
import ElementSetting from "../_components/ElementSetting";
import PlaygoundHeader from "../_components/PlaygoundHeader";
import WebsiteDesign from "../_components/WebsiteDesign";

export type Frame = {
  frameId: string;
  projectId: string;
  designCode: string;
  frameUrl: string;
  chatMessages: Messages[];
};

export type Messages = {
  role: string;
  content: string;
};

const Playground = () => {
  const [frameDetails, setFrameDetails] = useState<Frame>();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [generatedCode, setGeneratedCode] = useState<any>();

  const { projectId } = useParams();
  const params = useSearchParams();
  const frameId = params.get("frameId");

  useEffect(() => {
    frameId && GetFrameDetails();
  }, [frameId]);

  const SaveGeneratedCode = async (code: string) => {
    const result = await axios.put("/api/frames", {
      designCode: code,
      frameId: frameId,
      projectId: projectId,
    });

    console.log(result.data);
    toast.success("Website is ready!");
  };

  // Get Frame details from DB with chat messages
  const GetFrameDetails = async () => {
    try {
      const result = await axios.get(
        `/api/frames?frameId=${frameId}&projectId=${projectId}`
      );

      // Check if data exists
      if (!result.data) return;

      setFrameDetails(result.data);
      const designCode = result.data?.designCode;
      const index = designCode?.indexOf("```html") + 7;
      const formattedCode = designCode?.slice(index);
      setGeneratedCode(formattedCode);

      // Send the first user message to AI to get response
      if (result.data?.chatMessages?.length == 1) {
        const userMsg = result.data?.chatMessages[0].content;
        SendMessage(userMsg);
      } else {
        setMessages(result.data?.chatMessages);
      }
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  };

  // Send message to AI and get response
  const SendMessage = async (userInput: string) => {
    setLoading(true);

    // Add user message to chat
    setMessages((prev: any) => [...prev, { role: "user", content: userInput }]);

    const result = await fetch("/api/ai-model", {
      method: "POST",
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: aiWebGenPrompt?.replace("{userInput}", userInput),
          },
        ],
      }),
    });

    const reader = result.body?.getReader();
    const decoder = new TextDecoder();

    let aiResponse = "";
    let isCode = false;
    const messageIndex = -1;

    while (true) {
      // @ts-ignore
      const { done, value } = await reader?.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      aiResponse += chunk;

      // Handle code generation streaming
      if (!isCode && aiResponse.includes("```html")) {
        isCode = true;
        const index = aiResponse.indexOf("```html") + 7;
        const initialCodeChunk = aiResponse.slice(index);
        setGeneratedCode((prev: any) => (prev || "") + initialCodeChunk);
      } else if (isCode) {
        // Stream code updates
        setGeneratedCode((prev: any) => (prev || "") + chunk);
      }
    }
    await SaveGeneratedCode(aiResponse);

    // After streaming end
    if (!isCode) {
      setMessages((prev: any) => [
        ...prev,
        { role: "assistant", content: aiResponse },
      ]);
    } else {
      setMessages((prev: any) => [
        ...prev,
        { role: "assistant", content: "Your code is ready!" },
      ]);
    }
    setLoading(false);
  };

  // Generated code change log
  useEffect(() => {
    if (messages.length > 0) {
      SaveMessages();
    }
  }, [messages]);

  const SaveMessages = async () => {
    await axios.put("/api/chats", {
      messages: messages,
      frameId: frameId,
    });
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <PlaygoundHeader />

      <div className="flex gap-4">
        {/* Chat Section */}
        <ChatSection
          messages={messages ?? []}
          onSend={(input: string) => SendMessage(input)}
          loading={loading}
        />

        {/* Website Design section */}
        <WebsiteDesign generatedCode={generatedCode} />
      </div>
    </div>
  );
};

export default Playground;
