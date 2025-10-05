"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip } from "@/components/ui/tooltip";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import {
  Crop,
  Expand,
  ImageIcon,
  ImageMinus,
  ImagePlus,
  ImageUpscale,
  Sparkles,
} from "lucide-react";
import React from "react";

type Props = {
  selectedEl: HTMLImageElement;
};

const transformOptions = [
  { label: "Smart Crop", value: "smartcrop", icon: <Crop /> },
  { label: "Resize", value: "resize", icon: <Expand /> },
  { label: "Upscale", value: "upscale", icon: <ImageUpscale /> },
  { label: "BG Remove", value: "bgremove", icon: <ImageMinus /> },
];

const ImageSettingSection = ({ selectedEl }: Props) => {
  const [altText, setAltText] = React.useState(selectedEl?.alt || "");
  const [width, setWidth] = React.useState<number>(selectedEl?.width || 300);
  const [height, setHeight] = React.useState<number>(selectedEl?.height || 300);
  const [borderRadius, setBorderRadius] = React.useState(
    selectedEl?.style.borderRadius || "0px"
  );
  const [preview, setPreview] = React.useState(selectedEl?.src || "");
  const [activeTransformation, setActiveTransformation] = React.useState<
    string[]
  >([]);
  const fieldInputRef = React.useRef<HTMLInputElement>(null);
  // Toggle transformation options
  const toggleTransformation = (value: string) => {
    setActiveTransformation((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openFileDialog = () => {
    fieldInputRef.current?.click();
  };

  return (
    <div className="w-96 p-4 shadow spavce-y-4">
      <h2 className="flex items-center gap-2 font-semibold text-lg mb-4">
        <ImageIcon />
        Image Settings
      </h2>

      {/* Image Preview(clickable) */}
      <div className="flex justify-center">
        <img
          src={preview}
          alt={altText}
          className="max-w-full max-h-60 cursor-pointer mb-3"
          onClick={openFileDialog}
        />
      </div>

      {/* Hiddent file input */}
      <input
        type="file"
        accept="image/*"
        ref={fieldInputRef}
        className="hidden"
        onChange={handleInputChange}
      />

      {/* File Upload button */}
      <Button
        type="button"
        variant={"outline"}
        className="w-full mb-3"
        onClick={openFileDialog}
      >
        <ImagePlus /> Upload Image
      </Button>

      {/* Alt Text */}
      <div className="">
        <label className="text-sm">Prompt</label>
        <Input
          type="text"
          className="mt-1 mb-3"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          placeholder="Enter alt text."
        />
      </div>

      <Button className="w-full mb-2">
        <Sparkles />
        Generate AI Image
      </Button>

      {/* Transform Buttons */}
      <div className="">
        <label className="text-sm ">AI Transform</label>
        <div className="flex flex-wrap gap-2 mt-1">
          <TooltipProvider>
            {transformOptions.map((opt) => {
              const applied = activeTransformation.includes(opt.value);
              return (
                <Tooltip key={opt.value}>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant={applied ? "default" : "outline"}
                      className="flex items-center justify-between"
                      onClick={() => toggleTransformation(opt.value)}
                    >
                      {opt.icon}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <Badge>{opt.label}</Badge> {applied && "(Applied)"}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </div>
      </div>

      {/* Conditional Resixe inputs */}
      {activeTransformation.includes("resize") && (
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-sm">Width</label>
            <Input
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="mt-1"
            />
          </div>
          <div className="flex-1">
            <label className="text-sm">Height</label>
            <Input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="mt-1"
            />
          </div>
        </div>
      )}

      {/* Border Radius */}
      <div>
        <label className="text-sm">Border Radius</label>
        <Input
          type="text"
          value={borderRadius}
          onChange={(e) => setBorderRadius(e.target.value)}
          placeholder="e.g. 8px or 50%"
          className="mt-1"
        />
      </div>
    </div>
  );
};

export default ImageSettingSection;
