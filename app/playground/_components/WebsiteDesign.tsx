import { HTML_CODE, HTML_CODE_limited } from "@/config/HtmlCode";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import WebPageTools from "./WebPageTools";
import { cleanCode } from "@/lib/cleanCode";
import ElementSetting from "./ElementSetting";

type Props = {
  generatedCode: string;
};

const WebsiteDesign = ({ generatedCode }: Props) => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [selectedScreenSize, setSelectedScreenSize] = useState("web");

  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(
    null
  );

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

      // Update React state with the selected element
      setSelectedElement(selectedEl);
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
        // Clear React state as well
        setSelectedElement(null);
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
    <div className="flex gap-2 w-full">
      <div className="flex flex-col items-center p-2 w-full">
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

      {/* Settings section */}
      {selectedElement && (
        <ElementSetting
          selectedEl={selectedElement}
          clearSelection={() => setSelectedElement(null)}
        />
      )}
    </div>
  );
};

export default WebsiteDesign;
