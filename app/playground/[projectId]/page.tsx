"use client";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import ChatSection from "../_components/ChatSection";
import ElementSetting from "../_components/ElementSetting";
import PlaygoundHeader from "../_components/PlaygoundHeader";
import WebsiteDesign from "../_components/WebsiteDesign";
import { aiWebGenPrompt } from "@/prompt/Prompt";

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
  const [selectedElement] = useState(false);
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

  // Get Frame details from DB with chat messages
  const GetFrameDetails = async () => {
    try {
      const result = await axios.get(
        `/api/frames?frameId=${frameId}&projectId=${projectId}`
      );

      console.log("Frame API Result:", result.data);
      if (!result.data) return;

      setFrameDetails(result.data);

      // Send the first user message to AI to get response
      if (result.data?.chatMessages?.length == 1) {
        const userMsg = result.data?.chatMessages[0].content;
        SendMessage(userMsg);
      } else {
        setMessages(result.data?.chatMessages);
      }

      console.log("Frame Details are", result.data);
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  };

  // Send message to AI and get response
  const SendMessage = async (userInput: string) => {
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);

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
    while (true) {
      // @ts-ignore
      const { done, value } = await reader?.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      aiResponse += chunk;

      console.log("AI Response Chunk:", chunk);

      // Handle code generation streaming
      // If AI start sending code or not
      if (!isCode && aiResponse.includes("```html")) {
        isCode = true;
        const index = aiResponse.indexOf("```html") + 7;
        const initialCodeChunk = aiResponse.slice(index);
        setGeneratedCode((prev: any) => prev + initialCodeChunk);
      } else if (isCode) {
        console.log("AI Response Chunk:", chunk);
        setGeneratedCode((prev: any) => prev + chunk);
      }
    }

    // After streaming end
    if (!isCode) {
      console.log("AI Response streaming end:");
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
    if (messages.length > 0 && !loading) {
      SaveMessages();
    }
  }, [messages]);

  const SaveMessages = async () => {
    await axios.put("/api/chats", {
      messages: messages,
      frameId: frameId,
      projectId: projectId,
    });
  };

  useEffect(() => {
    console.log("Generated Code:", generatedCode);
  }, [generatedCode]);
  return (
    <div>
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

        {/* Settings section */}
        {selectedElement && <ElementSetting />}
      </div>
    </div>
  );
};

export default Playground;
