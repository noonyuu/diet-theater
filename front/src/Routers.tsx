import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
// routes
import Secret from "./secret/Secret";
// pages
import Login from "./pages/Login";
// components
import NotFound from "./component/notFound";
import { GetUser, RefreshToken } from "./script/Auth";
import { Terms } from "./pages/Terms";

const Routers = () => {
  const navigate = useNavigate();

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
    <>
      <Routes>
        <Route path="/" element={<Terms />}></Route>
        <Route path="secret/*" element={<Secret />} />
        <Route path="/*" element={<NotFound />} />

        {/* test */}
        <Route path="/login-test" element={<Login />} />
      </Routes>
    </>
  );
};

export default Routers;
