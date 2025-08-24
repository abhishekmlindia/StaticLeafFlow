import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetStore } from "../../../reduxToolKit/resetAction";
import {
  Sun,
  Moon,
  ChevronDown,
  HelpCircle,
  Menu,
  Sidebar,
} from "feather-icons-react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space, Dropdown } from "antd";

const languageItems = [
  {
    key: "en",
    label: "English",
  },
  {
    key: "es",
    label: "Spanish",
  },
  {
    type: "divider",
  },
  {
    key: "fr",
    label: "French",
  },
];

function TopBar({ isOpen, setIsOpen }) {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(resetStore());
    localStorage.clear();
    navigate("/");
  };
  const userItems = [
    {
      label: (
        <a
          href="https://www.antgroup.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          1st menu item{" "}
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a
          href="https://www.aliyun.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          2nd menu item{" "}
        </a>
      ),
      key: "1",
    },
    { type: "divider" },
    { label: "3rd menu item", key: "3" },
  ];
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
    <header className="bg-white dark:bg-gray-950 fixed w-full z-10 top-0 start-0 border-b border-gray-200 dark:border-gray-800 pr-4">
      {" "}
      <div className=" mx-auto">
        {" "}
        <div className="flex h-16 items-center justify-between">
          {" "}
          <nav className="">
            {" "}
            <ul className="flex max-w-screen-xl mx-auto p-4 space-x-6 text-sm font-medium items-center justify-center nav-primary">
              {" "}
              <li className="mr-5">
                {" "}
                <a
                  className="flex items-center justify-center px-2 py-5"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(!isOpen);
                  }}
                >
                  {" "}
                  <Sidebar className="text-gray-400" />{" "}
                </a>{" "}
              </li>{" "}
              <li>
                {" "}
                <a
                  href="#"
                  className="active border-b-4 border-transparent px-2 py-5 font-semibold text-base text-gray-400 dark:text-gray-600"
                >
                  {" "}
                  Knowledge Base{" "}
                </a>{" "}
              </li>{" "}
              <li>
                {" "}
                <a
                  href="#"
                  className="border-b-4 border-transparent px-2 py-5 font-semibold text-base text-gray-400 dark:text-gray-600"
                >
                  {" "}
                  Chat{" "}
                </a>{" "}
              </li>{" "}
              <li>
                {" "}
                <a
                  href="#"
                  className="border-b-4 border-transparent px-2 py-5 font-semibold text-base text-gray-400 dark:text-gray-600"
                >
                  {" "}
                  Search{" "}
                </a>{" "}
              </li>{" "}
              <li>
                {" "}
                <a
                  href="#"
                  className="border-b-4 border-transparent px-2 py-5 font-semibold text-base text-gray-400 dark:text-gray-600"
                >
                  {" "}
                  Agent{" "}
                </a>{" "}
              </li>{" "}
              <li>
                {" "}
                <a
                  href="#"
                  className="border-b-4 border-transparent px-2 py-5 font-semibold text-base text-gray-400 dark:text-gray-600"
                >
                  {" "}
                  File Management{" "}
                </a>{" "}
              </li>{" "}
            </ul>{" "}
          </nav>{" "}
          <div className="md:flex md:items-center md:gap-12">
            {" "}
            <nav aria-label="Global" className="hidden md:block">
              {" "}
              <ul className="flex items-center gap-6 text-sm">
                {" "}
                <li>
                  {" "}
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                    onClick={() => {
                      document.documentElement.classList.toggle("dark");
                      setDarkMode(!darkMode);
                      localStorage.setItem(
                        "theme",
                        !darkMode ? "dark" : "light"
                      );
                    }}
                  >
                    {" "}
                    {darkMode ? (
                      <Sun size={24} className="text-white" />
                    ) : (
                      <Moon size={24} className="text-gray-950" />
                    )}{" "}
                  </a>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    {" "}
                    <HelpCircle
                      size={24}
                      className="text-gray-950 dark:text-white"
                    />{" "}
                  </a>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <Dropdown menu={{ items: languageItems }} trigger={["click"]}>
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Space>
                        <h6 className="text-sm">English</h6>
                        <ChevronDown className="text-gray-500" />
                      </Space>
                    </div>
                  </Dropdown>
                </li>{" "}
              </ul>{" "}
            </nav>{" "}
            <div className="flex items-center gap-4">
              {" "}
              <div className="sm:flex sm:gap-4">
                <Dropdown menu={{ items: userItems }} trigger={["click"]}>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Space>
                      <Avatar
                        className="bg-site/60 mr-2"
                        shape="square"
                        icon={<UserOutlined className="text-gray-900"/>}
                      />
                      <h6 className="font-semibold text-sm">Bessie Cooper</h6>
                      <ChevronDown className="text-gray-500" />
                    </Space>
                  </div>
                </Dropdown>
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </header>
  );
}
export default TopBar;
