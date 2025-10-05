import { Button } from "@/components/ui/button";
import { replaceWithCleanCode } from "@/lib/cleanCode";
import {
  Code2Icon,
  Download,
  Monitor,
  SquareArrowOutUpRight,
  TabletSmartphone,
} from "lucide-react";
import { useEffect, useState } from "react";
import ViewCodeBlock from "./ViewCodeBlock";

const WebPageTools = ({
  selectedScreenSize,
  setSelectedScreenSize,
  generatedCode,
}: any) => {
  const [finalCode, setFinalCode] = useState<string>();

  useEffect(() => {
    const cleanCode = replaceWithCleanCode(generatedCode || "");
    setFinalCode(cleanCode);

    return () => {};
  }, [generatedCode]);

  const ViewInNewTab = () => {
    if (!finalCode) return;

    const blob = new Blob([finalCode ?? ""], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    window.open(url, "_blank");
  };

  // Download code
  const DownloadCode = () => {
    if (!finalCode) return;
    const blob = new Blob([finalCode ?? ""], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "website.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center justify-between p-2 shadow rounded-2xl w-full">
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => setSelectedScreenSize("web")}
          className={`${
            selectedScreenSize == "web" ? "border border-primary" : null
          }`}
        >
          <Monitor />
        </Button>
        <Button
          variant="outline"
          onClick={() => setSelectedScreenSize("mobile")}
          className={`${
            selectedScreenSize == "mobile" ? "border border-primary" : null
          }`}
        >
          <TabletSmartphone />
        </Button>
      </div>

      <div className="flex gap-2">
        <Button variant={"outline"} onClick={() => ViewInNewTab()}>
          View
          <SquareArrowOutUpRight />
        </Button>

        {/* View Code Button */}
        <ViewCodeBlock code={finalCode}>
          <Button>
            View <Code2Icon />
          </Button>
        </ViewCodeBlock>

        {/* Download Button */}
        <Button onClick={DownloadCode}>
          Download <Download />
        </Button>
      </div>
    </div>
  );
};

export default WebPageTools;
