import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContextWrapper } from "../context/ContextWrapper";
import { AdminAgenda } from "../pages/admin/AdminAgenda";
import StandbyScreen from "../pages/admin/StandbyScreen";
import HamburgerMenu from "../component/Header";
import CreateCard from "../pages/admin/CreateCard";
import ExcelReader from "../pages/admin/xlsx";
import { LoginPage } from "../pages/admin/login";
import { Terms } from "../pages/Terms";
import Article from "../pages/user/article/Article";
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
          <Route path="/crate-card" element={<CreateCard />} />
          <Route path="/x" element={<ExcelReader />} />
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/terms" element={<Terms />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/article" element={<Article />} />
        </Routes>
        <Footer />
      </ContextWrapper>
    </>
  );
};


export default Secret;
