import { HTML_CODE, HTML_CODE_limited } from "@/config/HtmlCode";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import WebPageTools from "./WebPageTools";
import { cleanCode } from "@/lib/cleanCode";

type Props = {
  generatedCode: string;
};

const WebsiteDesign = ({ generatedCode }: Props) => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [selectedScreenSize, setSelectedScreenSize] = useState("web");

  // Initial Frame shell once
  useEffect(() => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;

    doc.open();
    doc.write(HTML_CODE);
    doc?.close();

    let hoverEl: HTMLElement | null = null;
    let selectedEl: HTMLElement | null = null;

    const handleMouseOver = (e: MouseEvent) => {
      if (selectedEl) return;
      const target = e.target as HTMLElement;
      if (hoverEl && hoverEl !== target) {
        hoverEl.style.outline = "";
      }

      hoverEl = target;
      hoverEl.style.outline = "2px dotted blue";
    };
    const handleMouseOut = (e: MouseEvent) => {
      if (selectedEl) return;
      if (hoverEl) {
        hoverEl.style.outline = "";
        hoverEl = null;
      }
    };

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const target = e.target as HTMLElement;

      if (selectedEl && selectedEl !== target) {
        selectedEl.style.outline = "";
        selectedEl.removeAttribute("contenteditable");
      }
      selectedEl = target;
      selectedEl.style.outline = "2px solid red";
      selectedEl.setAttribute("contenteditable", "true");
      selectedEl.focus();
      console.log("Selected element:", selectedEl.outerHTML);
    };

    const handleBlur = () => {
      if (selectedEl)
        console.log("Final edited element:", selectedEl.outerHTML);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedEl) {
        selectedEl.style.outline = "";
        selectedEl.removeAttribute("contenteditable");
        selectedEl.removeEventListener("blur", handleBlur);
        selectedEl = null;
      }
    };

    doc.body?.addEventListener("mouseover", handleMouseOver);
    doc.body?.addEventListener("mouseout", handleMouseOut);
    doc.body?.addEventListener("click", handleClick);
    doc?.addEventListener("keydown", handleKeyDown);

    // Cleanup on unmount
    return () => {
      doc.body?.removeEventListener("mouseover", handleMouseOver);
      doc.body?.removeEventListener("mouseout", handleMouseOut);
      doc.body?.removeEventListener("click", handleClick);
      doc?.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Update body only when generatedCode changes
  useEffect(() => {
    if (!generatedCode || !iframeRef.current) {
      console.log("Missing generatedCode or iframe ref");
      return;
    }

    const doc = iframeRef.current.contentDocument;
    if (!doc) {
      console.log("No document found in iframe");
      return;
    }

    const root = doc.getElementById("root");
    if (!root) {
      console.log("No root element found in iframe document");
      return;
    }

    // New code to update iframe content with script initialization
    try {
      // Clean the generated code more carefully
      let cleanedCode = generatedCode;

      // Remove markdown code block markers only
      cleanedCode = cleanedCode.replace(/```html\n?/g, "");
      cleanedCode = cleanedCode.replace(/```\n?$/g, "");
      cleanedCode = cleanedCode.replace(/body\n?$/g, "");
      cleanedCode = cleanedCode.trim();

      root.innerHTML = cleanedCode;

      // Initialize any scripts that might be needed
      const initScript = doc.createElement("script");
      initScript.textContent = `
        console.log("Initializing iframe scripts");
        // Initialize AOS if it exists
        if (typeof AOS !== 'undefined') {
          AOS.init();
          console.log("AOS initialized");
        }
        // Initialize Flowbite if it exists
        if (typeof Flowbite !== 'undefined') {
          Flowbite.init();
          console.log("Flowbite initialized");
        }
        // Initialize Lucide icons if needed
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
          console.log("Lucide icons initialized");
        }
      `;
      doc.head.appendChild(initScript);
    } catch (error) {
      console.error("Error setting iframe content:", error);
    }
  }, [generatedCode]);

  return (
    <div className="flex flex-col items-center flex-1 p-5 ">
      <iframe
        ref={iframeRef}
        title="Website Preview"
        className={cn(
          selectedScreenSize == "web" ? "w-full" : "w-100",
          "h-[750px] border rounded-lg"
        )}
        sandbox="allow-scripts allow-same-origin allow-forms"
      />

      <WebPageTools
        selectedScreenSize={selectedScreenSize}
        setSelectedScreenSize={(v: string) => setSelectedScreenSize(v)}
        generatedCode={generatedCode}
      />
    </div>
  );
};

export default WebsiteDesign;

{
  /* {generatedCode && generatedCode.length > 0 ? ( ) : (
        <div className="flex items-center justify-center h-full">
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-center w-12 h-12 mb-4 mx-auto bg-blue-100 rounded-lg dark:bg-blue-900">
              <svg
                className="w-6 h-6 text-blue-600 dark:text-blue-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
              Website Preview
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">
              Your website template will appear here.
              <br /> Please wait AI is generating your code.
            </p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
      )} */
}
