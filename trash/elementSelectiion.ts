// useEffect(() => {
//   if (!iframeRef.current) return;
//   const doc = iframeRef.current.contentDocument;
//   if (!doc) return;

//   doc.open();
//   doc.write(HTML_CODE);
//   doc.close();

//   let hoverEl: HTMLElement | null = null;
//   let selectedEl: HTMLElement | null = null;

//   const handleMouseOver = (e: MouseEvent) => {
//     if (selectedEl) return;
//     const target = e.target as HTMLElement;
//     if (hoverEl && hoverEl !== target) {
//       hoverEl.style.outline = "";
//     }

//     hoverEl = target;
//     hoverEl.style.outline = "2px dotted blue";
//   };
//   const handleMouseOut = (e: MouseEvent) => {
//     if (selectedEl) return;
//     if (hoverEl) {
//       hoverEl.style.outline = "";
//       hoverEl = null;
//     }
//   };

//   const handleClick = (e: MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const target = e.target as HTMLElement;

//     if (selectedEl && selectedEl !== target) {
//       selectedEl.style.outline = "";
//       selectedEl.removeAttribute("contenteditable");
//     }
//     selectedEl = target;
//     selectedEl.style.outline = "2px solid red";
//     selectedEl.setAttribute("contenteditable", "true");
//     selectedEl.focus();
//     console.log("Selected element:", selectedEl.outerHTML);
//   };

//   const handleBlur = () => {
//     if (selectedEl) console.log("Final edited element:", selectedEl.outerHTML);
//   };

//   const handleKeyDown = (e: KeyboardEvent) => {
//     if (e.key === "Escape" && selectedEl) {
//       ``;
//       selectedEl.style.outline = "";
//       selectedEl.removeAttribute("contenteditable");
//       selectedEl.removeEventListener("blur", handleBlur);
//       selectedEl = null;
//     }
//   };

//   doc.body?.addEventListener("mouseover", handleMouseOver);
//   doc.body?.addEventListener("mouseout", handleMouseOut);
//   doc.body?.addEventListener("click", handleClick);
//   doc?.addEventListener("keydown", handleKeyDown);

//   // Cleanup on unmount
//   return () => {
//     doc.body?.removeEventListener("mouseover", handleMouseOver);
//     doc.body?.removeEventListener("mouseout", handleMouseOut);
//     doc.body?.removeEventListener("click", handleClick);
//     doc?.removeEventListener("keydown", handleKeyDown);
//   };
// }, []);
