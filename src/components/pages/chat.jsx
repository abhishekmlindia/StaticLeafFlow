import { useState, useRef, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Input, Button, Avatar, Dropdown } from "antd";
import { MoreVertical, Search } from "feather-icons-react";

function Chat() {
  const navigate = useNavigate();
  const { isOpen } = useOutletContext(); // ✅ get sidebar state

  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const languageItems = [
    {
      key: "en",
      label: "Option 1",
    },
    {
      key: "es",
      label: "Option 2",
    },
    {
      type: "divider",
    },
    {
      key: "fr",
      label: "option 3",
    },
  ];
  // ... your chat logic remains the same ...

  return (
    <div className="fixed pt-16 top-0 left-20 h-screen w-[280px] bg-siteDarkGey dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-5 ">
        <h2 className="font-semibold text-xl text-gray-900 dark:text-white">
          Assistance
        </h2>
        <Search size={24} className="text-gray-600 cursor-pointer" />
      </div>

      {/* Create Assistance Button */}
      <div className="p-4 pt-0">
        <Button
          type="primary"
          size={"large"}
          className="bg-site hover:!bg-site/80 flex w-full"
        >
          <svg
            width={25}
            height={25}
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.9199 3.502C13.4499 3.50067 12.9499 3.5 12.4199 3.5C7.94192 3.5 5.70192 3.5 4.31092 4.891C2.91992 6.282 2.91992 8.521 2.91992 13C2.91992 17.478 2.91992 19.718 4.31092 21.109C5.70192 22.5 7.94092 22.5 12.4199 22.5C16.8979 22.5 19.1379 22.5 20.5289 21.109C21.9199 19.718 21.9199 17.479 21.9199 13C21.9199 12.47 21.9193 11.97 21.9179 11.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.91992 18C10.2519 15.558 14.5629 15.443 16.9199 18M19.4199 2.5L19.6779 3.197C20.0159 4.111 20.1849 4.568 20.5179 4.901C20.8519 5.235 21.3089 5.404 22.2229 5.742L22.9199 6L22.2229 6.258C21.3089 6.596 20.8519 6.765 20.5189 7.098C20.1849 7.432 20.0159 7.889 19.6779 8.803L19.4199 9.5L19.1619 8.803C18.8239 7.889 18.6549 7.432 18.3219 7.099C17.9879 6.765 17.5309 6.596 16.6169 6.258L15.9199 6L16.6169 5.742C17.5309 5.404 17.9879 5.235 18.3209 4.902C18.6549 4.568 18.8239 4.111 19.1619 3.197L19.4199 2.5ZM14.9149 10.5C14.9149 11.88 13.7949 13 12.4119 13C12.0833 13.0005 11.7578 12.9362 11.454 12.8108C11.1502 12.6854 10.8741 12.5014 10.6416 12.2692C10.409 12.037 10.2245 11.7612 10.0986 11.4576C9.97272 11.1541 9.90792 10.8286 9.90792 10.5C9.90792 9.12 11.0279 8 12.4119 8C12.7405 7.99961 13.0659 8.06398 13.3696 8.18944C13.6732 8.3149 13.9492 8.49899 14.1816 8.73117C14.4141 8.96336 14.5985 9.23909 14.7243 9.5426C14.8502 9.84611 14.9149 10.1714 14.9149 10.5Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Create an assistance
        </Button>
      </div>

      {/* Agents List */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between p-4 hover:bg-white dark:hover:bg-gray-800 cursor-pointer">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 bg-red-200 text-red-600 font-semibold">
              AB
            </Avatar>

            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 dark:text-white">
                HR Agent
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                A helpful doing
              </span>
            </div>
          </div>
          <Dropdown
            menu={{ items: languageItems }}
            trigger={["click"]}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            <div
              className="flex items-center cursor-pointer"
              onClick={(e) => e.preventDefault()}
            >
              <MoreVertical />
            </div>
          </Dropdown>
        </div>
        <div className="flex items-center justify-between p-4 hover:bg-white dark:hover:bg-gray-800 cursor-pointer">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 bg-blue-200 text-blue-600 font-semibold">
              AB
            </Avatar>

            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 dark:text-white">
                HR Agent
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                A helpful doing
              </span>
            </div>
          </div>
          <Dropdown
            menu={{ items: languageItems }}
            trigger={["click"]}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            <div
              className="flex items-center cursor-pointer"
              onClick={(e) => e.preventDefault()}
            >
              <MoreVertical />
            </div>
          </Dropdown>
        </div>
        <div className="flex items-center justify-between p-4 hover:bg-white dark:hover:bg-gray-800 cursor-pointer">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 bg-green-200 text-green-600 font-semibold">
              AB
            </Avatar>

            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 dark:text-white">
                HR Agent
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                A helpful doing
              </span>
            </div>
          </div>
          <Dropdown
            menu={{ items: languageItems }}
            trigger={["click"]}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            <div
              className="flex items-center cursor-pointer"
              onClick={(e) => e.preventDefault()}
            >
              <MoreVertical />
            </div>
          </Dropdown>
        </div>
        <div className="flex items-center justify-between p-4 hover:bg-white dark:hover:bg-gray-800 cursor-pointer bg-white">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 bg-yellow-200 text-yellow-600 font-semibold">
              AB
            </Avatar>

            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 dark:text-white">
                HR Agent
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                A helpful doing
              </span>
            </div>
          </div>
          <Dropdown
            menu={{ items: languageItems }}
            trigger={["click"]}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            <div
              className="flex items-center cursor-pointer"
              onClick={(e) => e.preventDefault()}
            >
              <MoreVertical />
            </div>
          </Dropdown>
        </div>
        <div className="flex items-center justify-between p-4 hover:bg-white dark:hover:bg-gray-800 cursor-pointer">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 bg-violet-200 text-violet-600 font-semibold">
              AB
            </Avatar>

            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 dark:text-white">
                HR Agent
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                A helpful doing
              </span>
            </div>
          </div>
          <Dropdown
            menu={{ items: languageItems }}
            trigger={["click"]}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            <div
              className="flex items-center cursor-pointer"
              onClick={(e) => e.preventDefault()}
            >
              <MoreVertical />
            </div>
          </Dropdown>
        </div>
        <div className="flex items-center justify-between p-4 hover:bg-white dark:hover:bg-gray-800 cursor-pointer">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 bg-red-200 text-red-600 font-semibold">
              AB
            </Avatar>

            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 dark:text-white">
                HR Agent
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                A helpful doing
              </span>
            </div>
          </div>
          <Dropdown
            menu={{ items: languageItems }}
            trigger={["click"]}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            <div
              className="flex items-center cursor-pointer"
              onClick={(e) => e.preventDefault()}
            >
              <MoreVertical />
            </div>
          </Dropdown>
        </div>
        <div className="flex items-center justify-between p-4 hover:bg-white dark:hover:bg-gray-800 cursor-pointer">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 bg-blue-200 text-blue-600 font-semibold">
              AB
            </Avatar>

            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 dark:text-white">
                HR Agent
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                A helpful doing
              </span>
            </div>
          </div>
          <Dropdown
            menu={{ items: languageItems }}
            trigger={["click"]}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            <div
              className="flex items-center cursor-pointer"
              onClick={(e) => e.preventDefault()}
            >
              <MoreVertical />
            </div>
          </Dropdown>
        </div>
        <div className="flex items-center justify-between p-4 hover:bg-white dark:hover:bg-gray-800 cursor-pointer">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 bg-green-200 text-green-600 font-semibold">
              AB
            </Avatar>

            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 dark:text-white">
                HR Agent
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                A helpful doing
              </span>
            </div>
          </div>
          <Dropdown
            menu={{ items: languageItems }}
            trigger={["click"]}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            <div
              className="flex items-center cursor-pointer"
              onClick={(e) => e.preventDefault()}
            >
              <MoreVertical />
            </div>
          </Dropdown>
        </div>
        <div className="flex items-center justify-between p-4 hover:bg-white dark:hover:bg-gray-800 cursor-pointer">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 bg-yellow-200 text-yellow-600 font-semibold">
              AB
            </Avatar>

            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 dark:text-white">
                HR Agent
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                A helpful doing
              </span>
            </div>
          </div>
          <Dropdown
            menu={{ items: languageItems }}
            trigger={["click"]}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            <div
              className="flex items-center cursor-pointer"
              onClick={(e) => e.preventDefault()}
            >
              <MoreVertical />
            </div>
          </Dropdown>
        </div>
        <div className="flex items-center justify-between p-4 hover:bg-white dark:hover:bg-gray-800 cursor-pointer">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 bg-violet-200 text-violet-600 font-semibold">
              AB
            </Avatar>

            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 dark:text-white">
                HR Agent
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                A helpful doing
              </span>
            </div>
          </div>
          <Dropdown
            menu={{ items: languageItems }}
            trigger={["click"]}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            <div
              className="flex items-center cursor-pointer"
              onClick={(e) => e.preventDefault()}
            >
              <MoreVertical />
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default Chat;
