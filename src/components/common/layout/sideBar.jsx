import React from "react";
import { Tooltip } from "antd";
import {
  Menu,
  User,
  Lock,
  Layers,
  CloudDrizzle,
  Users,
  Settings,
} from "feather-icons-react";
import SmallLogo from "../../../../src/assets/img/small-logo.png";

function SideBar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* Component Start */}
      <div
        className={`flex flex-col items-center overflow-hidden h-[calc(100vh-65px)] text-gray-700 bg-white fixed z-10 top-16 dark:bg-gray-950 py-3 pb-5 px-2 border-r dark:border-gray-800 transition-all duration-300
          ${isOpen ? "w-20 opacity-100" : "w-0 opacity-0 overflow-hidden"}`}
      >
        <div className="flex flex-col items-center h-full">
          <div className="flex flex-col items-center mt-0 border-b pb-3">
            <div className="flex items-center justify-center w-5">
              <img src={SmallLogo} alt="LeafFlow" />
            </div>
          </div>

          {/* Menu */}
          <ul className="flex flex-col items-center mt-4 px-1 bg-siteLightGrey sidebar-menu rounded-2xl dark:bg-gray-900">
            <li className="mb-3">
              <Tooltip title="User Management" placement="right">
                <a href="#" className="menu-link">
                  <User width={20} />
                </a>
              </Tooltip>
            </li>
            <li className="mb-3">
              <Tooltip title="Lock" placement="right">
                <a href="#" className="menu-link active">
                  <Lock width={20}/>
                </a>
              </Tooltip>
            </li>
            <li className="mb-3">
              <Tooltip title="Layers" placement="right">
                <a href="#" className="menu-link">
                  <Layers width={20}/>
                </a>
              </Tooltip>
            </li>
            <li className="mb-3">
              <Tooltip title="Cloud" placement="right">
                <a href="#" className="menu-link">
                  <CloudDrizzle width={20}/>
                </a>
              </Tooltip>
            </li>
            <li className="mb-3">
              <Tooltip title="Users" placement="right">
                <a href="#" className="menu-link">
                  <Users width={20}/>
                </a>
              </Tooltip>
            </li>
          </ul>

          {/* Footer menu */}
          <ul className="mt-auto flex flex-col items-center px-1 py-0 bg-siteLightGrey sidebar-menu  rounded-2xl dark:bg-gray-900">
            <li className="mb-0">
              <Tooltip title="Settings" placement="right">
                <a href="#" className="menu-link p-0">
                  <Settings width={20}/>
                </a>
              </Tooltip>
            </li>
          </ul>
        </div>
      </div>
      {/* Component End */}
    </>
  );
}


export default SideBar;
