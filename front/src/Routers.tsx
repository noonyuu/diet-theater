import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { LoginPage } from "./pages/admin/login";
import { Terms } from "./pages/terms";
import { Agenda } from "./pages/admin/agenda";
import { Chat } from "./pages/admin/chat";
import NotFound from "./component/notFound";
import Header from "./component/Header";
import { ContextWrapper } from "./context/ContextWrapper";
import Secret from "./secret/Secret";
import Article from "./pages/user/Article";
import Footer from "./component/Footer";

export const Routers = () => {
  return (
    <>
      <ContextWrapper>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className=" bg-bac-main">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Terms />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/terms" element={<Terms />} />
                <Route path="/agenda" element={<Agenda />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="secret/*" element={<Secret />} />
                <Route path="/article" element={<Article />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </main>
          <Footer />
        </div>
      </ContextWrapper>
    </>
  );
};
