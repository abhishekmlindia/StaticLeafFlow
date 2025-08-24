import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; //

export default function Search() {
   const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [text, setText] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = async () => {

     navigate("/searchDetails");
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
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);
  return (
    <>
      

      <div className="flex flex-col items-center justify-center my-auto h-[calc(100vh-200px)]">
       
        <div className="w-[80%] md:w-[600px]">
          <h1 className="text-center mb-5 md:mb-10 flex mx-auto items-center justify-center">
            <span className="pixelify-sans-font-bold dark:text-amber-400 text-4xl md:text-5xl">
              ThinkTrackers
            </span>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version={1.0}
              width="50"
              height="50"
              viewBox="0 0 512.000000 512.000000"
              preserveAspectRatio="xMidYMid meet"
              className="ai-icon ml-2"
            >
              <g
                transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                fill=""
                stroke="none"
              >
                <path d="M1380 4305 c-236 -50 -430 -212 -527 -440 -54 -128 -54 -116 -51 -1340 4 -1262 -1 -1166 76 -1322 69 -140 185 -256 325 -325 152 -75 107 -72 940 -75 l747 -4 25 25 c41 41 34 73 -39 160 -35 42 -78 103 -95 136 -18 33 -37 63 -44 67 -7 4 -300 10 -652 13 -629 5 -641 5 -687 27 -66 30 -133 96 -165 162 l-28 56 0 1115 0 1115 28 56 c32 66 99 132 165 162 l47 22 1115 0 1115 0 47 -22 c66 -30 133 -96 165 -162 l28 -56 5 -570 c3 -313 9 -577 13 -587 11 -21 49 -35 120 -42 31 -4 81 -15 110 -26 73 -28 111 -26 137 7 21 27 21 28 18 652 l-3 626 -28 80 c-91 258 -290 436 -549 489 -68 14 -209 16 -1185 15 -900 0 -1120 -3 -1173 -14z" />
                <path d="M2008 3398 c-19 -15 -498 -1503 -498 -1547 0 -42 23 -51 123 -51 68 0 87 3 99 18 12 14 48 118 84 245 5 16 30 17 332 17 l328 0 38 -117 c55 -170 48 -163 156 -163 78 0 93 3 111 21 14 14 19 28 15 42 -3 12 -114 360 -246 772 -149 465 -247 755 -257 763 -11 8 -58 12 -143 12 -86 0 -131 -4 -142 -12z m268 -692 c64 -198 118 -366 121 -373 4 -11 -42 -13 -245 -13 l-249 0 116 363 c127 393 132 407 137 392 2 -5 56 -172 120 -369z" />
                <path d="M3177 3392 c-16 -17 -17 -86 -17 -789 0 -733 1 -771 18 -786 28 -26 182 -24 205 1 16 17 17 86 17 789 0 733 -1 771 -18 786 -28 26 -182 24 -205 -1z" />
                <path d="M3976 2058 c-8 -13 -49 -111 -92 -218 -130 -326 -164 -360 -490 -490 -115 -46 -215 -88 -222 -93 -7 -6 -12 -21 -10 -35 3 -22 24 -33 208 -106 245 -98 252 -102 319 -162 81 -73 113 -130 202 -356 71 -180 86 -209 106 -214 14 -4 28 -3 33 2 5 5 45 101 90 214 88 222 116 273 182 336 71 68 114 91 331 176 204 80 234 98 221 132 -3 8 -102 53 -222 101 -232 91 -304 134 -370 217 -46 58 -68 104 -147 308 -84 215 -104 242 -139 188z" />
              </g>
            </svg>
          </h1>
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleTextChange}
              placeholder="Message Thinktrackers..."
              className="w-full h-[54px] resize-none rounded-md border border-gray-300 bg-white px-4  py-4 pr-16 text-sm shadow-sm dark:focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            ></textarea>

            <button
              onClick={handleSubmit}
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
              {response && (
              <div className="mt-4 bg-gray-50 dark:bg-gray-900 p-4 border rounded-md">
                <h2 className="text-lg font-semibold mb-2">API Response</h2>
                <pre className="text-sm whitespace-pre-wrap">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </div>
            )}
        </div>

        <p className="mt-3 text-xs text-center text-gray-500 dark:text-gray-400">
          Thinktrackers - Tuteck © copyright 2025 - All rights reserved
        </p>
      </div>
    </>
  );
}
