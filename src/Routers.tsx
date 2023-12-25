import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { LoginPage } from "./pages/admin/login";
import { Terms } from "./pages/terms";

export const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  );
};
