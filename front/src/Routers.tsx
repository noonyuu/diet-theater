import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
// components
import NotFound from "./component/notFound";
import { Terms } from "./pages/Terms";
import Footer from "./component/Footer";
import Header from "./component/Header";
import { ContextWrapper } from "./context/ContextWrapper";
import { AdminAgenda } from "./pages/admin/AdminAgenda";
import { Agenda } from "./pages/user/summary/Agenda";
import { Chat } from "./pages/user/summary/Chat";
import AdminLogin from "./pages/admin/AdminLogin";
import { TheaterCreateTable } from "./pages/admin/TheaterCreateTable";
import TheaterCreate from "./pages/admin/TheaterCreate";
import TheaterShow from "./pages/user/TheaterShow";
import { Anime } from "./pages/user/Anime";
import Login from "./pages/Login";
import { Theater } from "./pages/user/Theater";

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
        <Route
          path="/anime"
          element={<LayoutWithoutHeaderAndFooter element={<Anime />} />}
        />
        <Route
          path="/login"
          element={<LayoutWithoutHeaderAndFooter element={<Login />} />}
        />
        <Route
          path="/theater"
          element={<LayoutWithoutHeaderAndFooter element={<Theater />} />}
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
        {/* 劇一覧 */}
        <Route
          path="/theater-show"
          element={<LayoutWithHeaderAndFooter element={<TheaterShow />} />}
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
          path={`/secret/theater-create-table`}
          element={
            <LayoutWithHeaderAndFooter element={<TheaterCreateTable />} />
          }
        />
        <Route
          path={`/secret/theater-create/:issueID`}
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
