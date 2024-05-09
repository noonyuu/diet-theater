import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContextWrapper } from "../context/ContextWrapper";
import { AdminAgenda } from "../pages/admin/AdminAgenda";
import StandbyScreen from "../pages/admin/StandbyScreen";
import HamburgerMenu from "../component/Header";
import ExcelReader from "../pages/admin/xlsx";
import { LoginPage } from "../pages/admin/login";
import { Terms } from "../pages/Terms";
import { Agenda } from "../pages/user/summary/Agenda";
import { Chat } from "../pages/user/summary/Chat";
import Header from "../component/Header";
import Footer from "../component/Footer";

const Secret = () => {
  return (
    <>
      <ContextWrapper>
        <Header />
        <Routes>
          <Route path="/admin-agenda" element={<AdminAgenda />} />
          <Route path="/standby-screen/:issueID" element={<StandbyScreen />} />
          <Route path="/x" element={<ExcelReader />} />
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/terms" element={<Terms />} />
          <Route path="/" element={<Agenda />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
        <Footer />
      </ContextWrapper>
    </>
  );
};

export default Secret;
