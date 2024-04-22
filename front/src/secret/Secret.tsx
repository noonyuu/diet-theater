import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContextWrapper } from "../context/ContextWrapper";
import { AdminAgenda } from "../pages/admin/AdminAgenda";
import StandbyScreen from "../pages/admin/StandbyScreen";
import HamburgerMenu from "../component/Header";
import CreateCard from "../pages/admin/CreateCard";
import ExcelReader from "../pages/admin/xlsx";

const Secret = () => {
  return (
    <Routes>
      <Route path="/admin-agenda" element={<AdminAgenda />} />
      <Route path="/standby-screen/:issueID" element={<StandbyScreen />} />
      <Route path="/crate-card" element={<CreateCard />} />
      <Route path="/x" element={<ExcelReader />} />
    </Routes>
  );
};

export default Secret;
