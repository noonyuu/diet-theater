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
import { GetUser, RefreshToken } from "./script/Auth";

const Routers = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("terms") ? "" : navigate("/");
  }, []);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const [logInned, userInfo] = await GetUser();
  //       console.log(userInfo);
  //       if (logInned && userInfo) {
  //         // トークン更新
  //         RefreshToken();
  //         // ログイン済みの場合
  //         if (
  //           window.location.pathname === "/" ||
  //           window.location.pathname === "/login"
  //         ) {
  //           navigate("/agenda");
  //         } else {
  //           navigate(window.location.pathname, { replace: true });
  //         }
  //       } else {
  //         navigate("/login");
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   fetchUser();
  // }, []);

  const routesWithoutHeaderAndFooter = [
    { path: "/", element: <Terms /> },
    { path: "/anime", element: <Anime /> },
    { path: "/login", element: <Login /> },
    { path: "/theater", element: <Theater /> },
  ];

  const routesWithHeaderAndFooter = [
    { path: "/agenda", element: <Agenda /> },
    { path: "/chat", element: <Chat /> },
    { path: "/theater-show", element: <TheaterShow /> },
    { path: `/${import.meta.env.VITE_APP_ADMIN}`, element: <AdminLogin /> },
    { path: `/secret/admin-agenda`, element: <AdminAgenda /> },
    { path: `/secret/theater-create-table`, element: <TheaterCreateTable /> },
    { path: `/secret/theater-create/:issueID`, element: <TheaterCreate /> },
  ];

  return (
    <ContextWrapper>
      <Routes>
        {/* ヘッダーとフッターなしで表示したいページ */}
        {routesWithoutHeaderAndFooter.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<LayoutWithoutHeaderAndFooter element={element} />}
          />
        ))}
        {/* ヘッダーとフッターを含むページ */}
        {routesWithHeaderAndFooter.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<LayoutWithHeaderAndFooter element={element} />}
          />
        ))}
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
