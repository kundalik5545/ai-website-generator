import { HTML_CODE } from "@/config/HtmlCode";

export const cleanCode = (code: string) => {
  let cleanedCode =
    code
      .replaceAll("```html", "")
      .replaceAll("```", "")
      .replaceAll("html", "") ?? "";

  return cleanedCode;
};

export const replaceWithCleanCode = (code: string) => {
  return HTML_CODE.replace('<body id="root">{code}</body>', cleanCode(code));
};
