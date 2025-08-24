import { useState, useRef, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Input, Button, Avatar, Dropdown, Space, Image, Tooltip } from "antd";
import {
  Calendar,
  File,
  FileText,
  List,
  MoreHorizontal,
  Plus,
  Search,
} from "feather-icons-react";

function KnowladgeBase() {
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
    <div
      className={`pt-24 pr-5 min-h-screen dark:bg-gray-900 bg-gray-100 transition-all duration-300 ${
        isOpen ? "pl-5" : "pl-5"
      }`}
    >
      <div className="flex items-center justify-center">
        <div>
          <h4 className="text-gray-500 text-2xl mb-2">
            Welcome to <span className="text-site">Leaflow AI</span>
          </h4>
          <h1 className="text-3xl">
            Great to see you again,{" "}
            <span className="font-bold"> Abhishek.ghosh</span>
          </h1>
        </div>
        <div className="ml-auto flex items-center">
          <div className="w-[290px] mr-3">
            <Input
              placeholder="Search..."
              prefix={<Search size={16} className="text-gray-400" />}
              className="input-custom rounded-lg border-gray-300 
             dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-100
             focus:ring-2 focus:ring-black dark:focus:ring-white h-10"
            />
          </div>
          <Button
            type="primary"
            size={"large"}
            className="bg-site hover:!bg-site/80"
          >
            <Plus />
            Create knowledge base
          </Button>
        </div>
      </div>

      <h5 className="text-md text-gray-500 mt-6 flex">
        <List className="mr-2 text-site" /> GET STARTED WITH AN EXAMPLE BELOW
      </h5>

      <div
        className="grid grid-cols-1 
                md:grid-cols-2 
                lg:grid-cols-3 
                xl:grid-cols-3 
                xxl:grid-cols-3 
                2xl:grid-cols-4 
                gap-4 mt-4"
      >
        <div className="group relative rounded-lg transition">
          <div
            className="rounded-lg p-[2px] bg-transparent
                  transition-all duration-150
                  group-hover:bg-gradient-to-r
                  group-hover:from-site group-hover:via-purple-500 group-hover:to-pink-500
                  group-hover:animate-gradient-x"
          >
            <div
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow 
                    transition group-hover:shadow-xl"
            >
              <div className="flex items-center mb-2">
                <div className="flex items-center mb-2">
                  <Avatar className="w-12 h-12 font-semibold text-[16px] bg-site/40 text-gray-800 dark:text-white dark:bg-site/60">
                    AG
                  </Avatar>
                  <div className="ml-3">
                    <h4 className="text-gray-400 text-sm mb-1">Ghosh</h4>
                    <h3 className="text-gray-950 font-semibold text-sm dark:text-white">
                      Abhishek
                    </h3>
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
                    <MoreHorizontal />
                  </div>
                </Dropdown>
              </div>
              <a href="#">
                <h2 className="text-site text-2xl font-medium mb-3">
                  Info Nest
                </h2>
              </a>
              <label className="text-sm text-gray-500">Model providers</label>
              <div className="flex mt-1 space-x-2">
                <Tooltip title="Chat GPT" placement="top">
                  <Avatar
                    className="w-9 h-9 bg-gray-100 border border-gray-300  dark:bg-gray-800"
                    src={
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgcJzt7nmd3Wz0o4ip0PnCSCnJu-zNItH0iM6V5Ie7Jefm91qBb2IToW-FA-YMX-p7r7E&usqp=CAU"
                        className="w-9 h-9"
                        alt="User Avatar"
                      />
                    }
                  />
                </Tooltip>
                <Tooltip title="Google Gemini" placement="top">
                  <Avatar
                    className="w-9 h-9 bg-gray-100 border border-gray-300 dark:bg-gray-800"
                    src={
                      <img
                        src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.png"
                        className="w-9 h-9"
                        alt="User Avatar"
                      />
                    }
                  />
                </Tooltip>
                <Tooltip title="Deep Seak" placement="top">
                  <Avatar
                    className="w-9 h-9 bg-gray-100 border border-gray-300  dark:bg-gray-800"
                    src={
                      <img
                        src="data:image/png;base64,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"
                        className="w-9 h-9"
                        alt="User Avatar"
                      />
                    }
                  />
                </Tooltip>
                <Tooltip title="Meta" placement="top">
                  <Avatar
                    className="w-9 h-9 bg-gray-100 border border-gray-300  dark:bg-gray-800"
                    src={
                      <img
                        src="data:image/png;base64,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"
                        className="w-9 h-9"
                        alt="User Avatar"
                      />
                    }
                  />
                </Tooltip>
              </div>
              <div className="flex justify-between items-center mt-5">
                <div className="flex items-center justify-center">
                  <FileText className="text-gray-500 mr-2" />{" "}
                  <span className="text-sm text-gray-500">1 Document</span>
                </div>
                <div className="flex items-center justify-center">
                  <Calendar className="text-gray-500 mr-2" />{" "}
                  <span className="text-sm text-gray-500">
                    Craeted on: 24 Jan 2024
                  </span>
                </div>
              </div>
            </div>

            <div
              className="absolute inset-0 rounded-lg p-[2px] opacity-0 hover:opacity-100
                  bg-gradient-to-r from-site via-purple-500 to-pink-500
                  animate-gradient-x pointer-events-none transition-opacity duration-200"
            >
              <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KnowladgeBase;
