import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
// routes
import Secret from "./secret/Secret";
// pages
import Login from "./pages/Login";
// components
import NotFound from "./component/notFound";

const Routers = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("terms") ? navigate("/secret/agenda") : navigate("/");
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="secret/*" element={<Secret />} />
        <Route path="/*" element={<NotFound />} />

        {/* test */}
        <Route path="/login-test" element={<Login />} />
      </Routes>
    </>
  );
};

export default Routers;
