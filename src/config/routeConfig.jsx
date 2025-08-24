import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import MainLayout from "../components/common/layout/mainLayout";
import LoginLayout from "../components/common/layout/loginLayout";
import Login from "../components/auth/login";
import TestTable from "../components/auth/testTable";
import KnowladgeBase from "../components/pages/knowladgebase";
import Chat from "../components/pages/chat";
const Search = lazy(() =>
  import("../components/pages/search")
);
const SearchDetails = lazy(() =>
  import("../components/pages/searchDetails")
);
function RouteConfig() {
  return (
    <BrowserRouter basename={"/"}>
      <Routes>
        {/* Login Layout */}
        <Route element={<LoginLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Main Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/datatable" element={<TestTable />} />
            <Route
            path="knowladgebase"
            element={
              <ProtectedRoute>
                <KnowladgeBase />
               </ProtectedRoute>
            }
          />
           <Route
            path="chat"
            element={
              <ProtectedRoute>
               <Chat/>
               </ProtectedRoute>
            }
          />
          <Route
            path="search"
            element={
              <ProtectedRoute>
                <Search />
               </ProtectedRoute>
            }
          />
          <Route
            path="SearchDetails"
            element={
              <ProtectedRoute>
                <SearchDetails />
               </ProtectedRoute>
            }
          />
         
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouteConfig;