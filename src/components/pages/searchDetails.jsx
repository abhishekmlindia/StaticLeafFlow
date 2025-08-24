import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function SearchDetails() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "AI",
      text: "Hello! How can I assist you today?",
      time: "10:00 AM",
    },
  ]);
  const [input, setInput] = useState("");

  // Handle sending a message
  const handleSend = () => {
    if (input.trim() === "") return;
    const newMessage = {
      id: messages.length + 1,
      sender: "You",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([...messages, newMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "AI",
          text: "I'm here to help! Please tell me more.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 1000);
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    // Auto-resize logic
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = Math.min(textarea.scrollHeight, 400) + "px"; // Limit to 400px
    }
  };
  return (
    <div className="relative  overflow-y-auto pt-20">
      <div className="mx-auto   w-full md:w-[768px] px-5 py-5 sm:px-6 lg:px-8">
        <div className="mt-4 bg-gray-50 border-amber-600 dark:bg-gray-900 dark:border-amber-500 p-4 border rounded-md">
          <h2 className="text-lg font-semibold mb-2">API Response</h2>
          <p>
            {" "}
            Ah, I see — since you’re using a LESS compiler plugin directly, your
            current file throws errors because: Tailwind directives like
            @tailwind base; are not valid LESS syntax — they only work when
            Tailwind’s PostCSS processor runs before compilation.
            @custom-variant and @theme are Tailwind extensions (or PostCSS
            plugins), not native LESS, so the LESS compiler will choke on them.
            The nesting you wrote (e.g., .dark is fine in LESS, but anything
            Tailwind-specific needs to be processed in PostCSS, not directly in
            LESS.
          </p>
        </div>

        <div className="mt-4 flex justify-end">
          <div className="p-4 bg-gray-200 dark:bg-gray-500  rounded-md max-w-screen-sm">
            <p>Can i using a LESS compiler plugin directly?</p>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <div type="button" className="dark:bg-gray-950 flex items-center p-2 rounded-md">
            <svg
              className="mr-3 -ml-1 size-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx={12}
                cy={12}
                r={10}
                stroke="currentColor"
                strokeWidth={4}
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
           <code className="text-amber-500">Generating…</code> 
          </div>
        </div>
      </div>
      <div className=" w-full fixed bottom-0  px-5 py-5 sm:px-6 lg:px-8 bg-gradientDark">
        <div className="relative bottom-15 z-10 md:w-[768px] mx-auto">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            placeholder="Message Thinktrackers..."
            className="w-full h-[54px] resize-none rounded-md border border-gray-300 bg-white px-4  py-4 pr-16 text-sm shadow-sm dark:focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          ></textarea>

          <button
            className="absolute bottom-2.5 right-2 rounded-md  bg-black p-1.5 text-white hover:bg-gray-800 transition h-10 w-12 flex items-center justify-center"
            type="button"
          >
            {/* Paper plane icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <p className="mt-3 text-xs text-center text-gray-500 dark:text-gray-400">
          Thinktrackers - Tuteck © copyright 2025 - All rights reserved
        </p>
      </div>
    </div>
  );
}

export default SearchDetails;
