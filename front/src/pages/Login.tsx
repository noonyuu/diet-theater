import React from "react";
import { SimpleIconsLine } from "../assets/Line";
import { LogosGoogleIcon } from "../assets/Google";
import LoginBtn from "../component/LoginBtn";

const Login = () => {
  return (
    <main className="mt-16 flex-1">
      <div className="text-center">
        <h1 className="mt-5 text-2xl">ログインor新規登録</h1>
        {/* 以下ログインアイコン */}
        <div>
          <LoginBtn name="Google" icon={<LogosGoogleIcon />} />
          <LoginBtn name="Line" icon={<SimpleIconsLine />} />
        </div>
      </div>
    </main>
  );
};

export default Login;
