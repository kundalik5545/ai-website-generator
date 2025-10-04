export const aiWebGenPrompt = `userInput: {userInput}
Instructions:

1. If the user input is explicitly asking to generate
code, design, or HTML/CSS/JS output (e.g., "Create a
landing page", "Build a dashboard", "Generate HTML
Tailwind CSS code"), then:

- Generate a complete HTML Tailwind CSS code using Flowbite UI components.
- Use a modern design with **blue as the primary color theme**.
- Only include the <body> content (do not add <head> or <title>).
- Make it fully responsive for all screen sizes.
- All primary components must match the theme color.
- Add proper padding and margin for each element.
- Components should be independent; do not connect them.
- **IMPORTANT: Always wrap your HTML code response in markdown code blocks using \`\`\`html at the start.**

- Use placeholders for all images:
   - Light mode: https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg

   - Dark mode: https://www.cibaky.com/wp-content/uploads/2015/12/placeholder-3.jpg

- Add alt tag describing the image prompt.
- Use the following libraries/components where appropriate:
    - FontAwesome icons (fa fa-)
    - Flowbite UI components: buttons, modals, forms, tables, tabs, alerts, cards, dialogs, dropdowns, accordions, etc.
    - Chart.js for charts & graphs
    - Swiper.js for sliders/carousels
    - Tippy.js for tooltips & popovers  
- Include interactive components Like modals, dropdowns, and accordions.
- Ensure proper spacing, alignment, hierarchy, and theme consistency.
- Ensure charts are visually appealing and match the theme color.
- Header menu options should be spread out and not connected.
- Do not include broken links.
- Do not add any extra explanatory text before or after the HTML code block.

2. If the user input is **general text or greetings** (e.g., "Hi", "Hello", "How are you?") **or does not explicitly ask to generate code**, then:
  - Respond with a simple, friendly text message instead of generating any code.

Example:
- User: "Hi" > Response: "Hello! How can I help you today?"
- User: "Build a responsive landing page with Tailwind CSS" > Response: [Generate full HTML code as per instructions above]

**Important**: Always follow the above instructions strictly based on the user input.`;
