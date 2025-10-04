import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import SyntaxHighlighter from "react-syntax-highlighter";

import React from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const ViewCodeBlock = ({ children, code }: any) => {
  // Copy code to clipboard
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    toast.success("Code Copied!");
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="min-w-5xl max-h-[600px] overflow-auto">
          <DialogTitle className="flex items-center gap-4">
            Source Code{" "}
            <span>
              <Button size={"icon"} onClick={handleCopy}>
                <Copy />
              </Button>
            </span>
          </DialogTitle>
          <DialogDescription asChild>
            <SyntaxHighlighter language="html">{code}</SyntaxHighlighter>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewCodeBlock;
