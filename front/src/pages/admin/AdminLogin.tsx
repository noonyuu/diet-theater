import React, { useState } from "react";
import { Button } from "../../component/Button";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const next = () => {
    const a_id: string = import.meta.env.VITE_APP_ID;
    const a_password: string = import.meta.env.VITE_APP_PASSWORD;

    if (a_id === id && a_password === password) {
      localStorage.setItem("admin", "true");
      navigate("/secret/admin-agenda");
    } else {
      console.log("ログイン失敗");
    }
  };

  return (
    <main className="mt-16 flex flex-1 items-center justify-center">
      <div className="border p-8">
        <div className="my-8 flex w-full flex-col">
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="ID"
              className="rounded-md border bg-white px-2"
              onChange={(e) => setId(e.target.value)}
            />
          </div>
        </div>
        <div className="my-8 flex w-full flex-col">
          <div className="flex justify-center">
            <input
              type="password"
              placeholder="Password"
              className="rounded-md border bg-white px-2"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="my-8 flex justify-center">
          <Button
            name="ログイン"
            color="bg-main-color"
            action={next}
            decoration="text-sm rounded-lg text-white font-black shadow-md shadow-slate-400"
          />
        </div>
      </div>
    </main>
  );
};

export default AdminLogin;
