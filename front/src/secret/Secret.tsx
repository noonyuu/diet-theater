import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContextWrapper } from "../context/ContextWrapper";
import { Footer } from "../component/Footer";
import { AdminAgenda } from "../pages/admin/AdminAgenda";
import StandbyScreen from "../pages/admin/StandbyScreen";
import HamburgerMenu from "../component/Header";

const Secret = () => {
  return (
    <Routes>
      <Route path="/admin-agenda" element={<AdminAgenda />} />
      <Route path="/standby-screen/:issueID" element={<StandbyScreen />} />
    </Routes>
  );
};

export default Secret;
