import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// routes
import Secret from "./secret/Secret";
// pages
import Login from "./pages/Login";
import { Terms } from "./pages/Terms";
// components
import NotFound from "./component/notFound";
import Header from "./component/Header";
import Footer from "./component/Footer";
// contexts
import { ContextWrapper } from "./context/ContextWrapper";

export const Routers = () => {

  return (
    <>
      <ContextWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Terms />}></Route>
            <Route path="secret/*" element={<Secret />} />
            <Route path="/*" element={<NotFound />} />

            {/* test */}
            <Route path="/login-test" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ContextWrapper>
    </>
  );
};
