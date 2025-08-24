import React, { useState, Suspense } from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./topBar";
import SideBar from "./sideBar";
import Loadingpage from "../loading-component/LoadingComponent";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div id="app-layout" className="selection:bg-amber-400 selection:text-amber-900">
      <Suspense fallback={<Loadingpage />}>
        {/* TopBar can toggle sidebar */}
        <TopBar isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="flex">
          {/* Sidebar */}
          <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

          {/* Main content expands */}
          <main
            className={`transition-all duration-300 w-full  ${
              isOpen ? "ml-20" : "ml-0"
            }`}
          >
            <Outlet context={{ isOpen }} />
          </main>
        </div>
      </Suspense>
    </div>
  );
}
