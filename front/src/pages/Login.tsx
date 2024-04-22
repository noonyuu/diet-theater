import React from "react";
import { SimpleIconsLine } from "../assets/Line";
import { LogosGoogleIcon } from "../assets/Google";
import LoginBtn from "../component/LoginBtn";

const Login = () => {
  return (
    <div className="text-center">
      <h1 className="mt-5 text-2xl">ログインor新規登録</h1>
      {/* 以下ログインアイコン */}
      <div>
        <LoginBtn name="Google" icon={<LogosGoogleIcon />} />
        <LoginBtn name="Line" icon={<SimpleIconsLine />} />
      </div>
    </div>
  );
};

export default Login;
