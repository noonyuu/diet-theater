import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { LoginPage } from "./pages/admin/login";

export const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
