import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
// routes
import Secret from "./secret/Secret";
// pages
import Login from "./pages/Login";
// components
import NotFound from "./component/notFound";
// import { GetUser, RefreshToken } from "./script/Auth";
import { Terms } from "./pages/Terms";
import Footer from "./component/Footer";
import Header from "./component/Header";
import { ContextWrapper } from "./context/ContextWrapper";
import { AdminAgenda } from "./pages/admin/AdminAgenda";
import CreateCard from "./pages/admin/CreateCard";
import StandbyScreen from "./pages/admin/StandbyScreen";
import { LoginPage } from "./pages/admin/login";
import ExcelReader from "./pages/admin/xlsx";
import Test from "./pages/user/Test";
import { Agenda } from "./pages/user/summary/Agenda";
import { Chat } from "./pages/user/summary/Chat";
import { TheaterCreate } from "./pages/admin/TheaterCreate";
import AdminLogin from "./pages/admin/AdminLogin";

const Routers = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("terms") ? "" : navigate("/");
  }, []);
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const [logInned, userInfo] = await GetUser();
  //       if (logInned && userInfo) {
  //         // トークン更新
  //         RefreshToken();
  //         // ログイン済みの場合
  //         if (
  //           window.location.pathname === "/" ||
  //           window.location.pathname === "/login-test"
  //         ) {
  //           navigate("/secret/agenda");
  //         } else {
  //           navigate(window.location.pathname, { replace: true });
  //         }
  //       } else {
  //         navigate("/login-test");
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   fetchUser();
  // }, []);

  return (
    <ContextWrapper>
      <Routes>
        {/* ヘッダーとフッターなしで表示したいページ */}
        <Route
          path="/"
          element={<LayoutWithoutHeaderAndFooter element={<Terms />} />}
        />

        {/* ヘッダーとフッターを含むページ */}
        {/* 一覧画面 */}
        <Route
          path="/agenda"
          element={<LayoutWithHeaderAndFooter element={<Agenda />} />}
        />
        {/* チャット画面 */}
        <Route
          path="/chat"
          element={<LayoutWithHeaderAndFooter element={<Chat />} />}
        />

        {/* 管理者 */}
        <Route
          path={`/${import.meta.env.VITE_APP_ADMIN}`}
          element={<LayoutWithHeaderAndFooter element={<AdminLogin />} />}
        />
        <Route
          path={`/secret/admin-agenda`}
          element={<LayoutWithHeaderAndFooter element={<AdminAgenda />} />}
        />
        <Route
          path={`/secret/theater-create`}
          element={<LayoutWithHeaderAndFooter element={<TheaterCreate />} />}
        />

        {/* 404 NotFound ページ */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ContextWrapper>
  );
};

interface LayoutProps {
  element: JSX.Element;
}

function LayoutWithoutHeaderAndFooter({ element }: LayoutProps) {
  // ヘッダーとフッターなしで要素を表示
  return <>{element}</>;
}

function LayoutWithHeaderAndFooter({ element }: LayoutProps) {
  // ヘッダーとフッターを含めて要素を表示
  return (
    <>
      <Header />
      {element}
      <Footer />
    </>
  );
}
export default Routers;
