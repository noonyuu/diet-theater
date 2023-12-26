import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { LoginPage } from "./pages/admin/login";
import { Terms } from "./pages/terms";
import { Agenda } from "./pages/admin/agenda";
import { Navbar } from "./component/navbar";

export const Routers = () => {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/terms" element={<Terms />} />
          <Route path="/agenda" element={<Agenda />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
