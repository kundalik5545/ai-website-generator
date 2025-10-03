"use client";
import React, { useEffect, useState } from "react";
import PlaygoundHeader from "../_components/PlaygoundHeader";
import ChatSection from "../_components/ChatSection";
import WebsiteDesign from "../_components/WebsiteDesign";
import ElementSetting from "../_components/ElementSetting";
import { useParams, useSearchParams } from "next/navigation";
import axios from "axios";
import { Loader2Icon } from "lucide-react";

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
  const { projectId } = useParams();
  const params = useSearchParams();
  const frameId = params.get("frameId");

  useEffect(() => {
    console.log("Running useEffect for GetFramesDetails");
    frameId && GetFrameDetails();
  }, [frameId]);

  const GetFrameDetails = async () => {
    try {
      const result = await axios.get(
        "/api/frames?frameId=" + frameId + "&projectId=" + projectId
      );
      setFrameDetails(result.data);
      console.log("Frame Details are", result.data);
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  };

  return (
    <div>
      <PlaygoundHeader />

      <div className="flex gap-4">
        {/* Chat Section */}
        <ChatSection messages={frameDetails?.chatMessages ?? []} />

        {/* Website Design section */}
        <WebsiteDesign />

        {/* Settings section */}
        {selectedElement && <ElementSetting />}
      </div>
    </div>
  );
};

export default Playground;
