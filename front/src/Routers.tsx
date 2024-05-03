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
import Article from "./pages/user/article/Article";
import { Agenda } from "./pages/user/summary/Agenda";
import { Chat } from "./pages/user/summary/Chat";

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
        <Route path="/home" element={<Secret />} />
        {/* <Route path="/*" element={<NotFound />} /> */}

        {/* test */}
        <Route path="/login-test" element={<Login />} />
      </Routes>
      
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
          <Route path="/test" element={<Test />} />
        </Routes>
        <Footer />
      </ContextWrapper>
    </>
  );
};

export default Routers;
