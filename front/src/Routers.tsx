import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { LoginPage } from "./pages/admin/login";
import { Terms } from "./pages/terms";
import { Agenda } from "./pages/admin/agenda";
import { Chat } from "./pages/admin/chat";
import NotFound from "./component/notFound";
import HamburgerMenu from "./component/navbar";
import { Footer } from "./component/footer";
import { ContextWrapper } from "./context/ContextWrapper";
import Secret from "./secret/Secret";

export const Routers = () => {
  return (
    <>
      <ContextWrapper>
        <HamburgerMenu />
        <main className="min-h-[calc(100%-5%)] bg-bac-main pt-[15%] lg:pt-[7%] lg:min-h-[calc(100%-5%)]">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Terms />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/terms" element={<Terms />} />
              <Route path="/agenda" element={<Agenda />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="secret/*" element={<Secret />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </main>
        <Footer />
      </ContextWrapper>
    </>
  );
};
