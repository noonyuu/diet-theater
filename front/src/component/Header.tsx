import React, { useContext, useEffect, useState } from "react";
// context
import { GlobalContext } from "../context/GlobalContext";
import { GetUser } from "../script/Auth";

export default function App() {
  const { profile, setProfile } = useContext(GlobalContext);
  const [isLoad, setIsLoad] = useState(true);
  useEffect(() => {
    // 初期化処理
    if (!isLoad) return;

    GetUser()
      .then((res) => {
        const [success, user] = res;
        if (success) {
          setProfile([
            {
              id: user.id,
              name: user.name,
              avatar_url: user.avatar_url,
              email: user.email,
            },
          ]);
        }
      })
      .then(() => {
        setIsLoad(false);
      });
  }, [isLoad]); // profileを依存配列から削除

  // profileが変更された時にのみ実行される
  useEffect(() => {}, [profile]);

  return (
    <header className="fixed top-0 z-50 flex h-16 w-full bg-white shadow-md">
      {/* humbergerbutton */}
      {/* <button
        onClick={handleMenuOpen}
        type="button"
        className="z-50 space-y-2 pr-8"
      >
        <div
          className={
            openMenu
              ? "h-0.5 w-8 translate-y-2.5 rotate-45 bg-gray-600 transition duration-500 ease-in-out"
              : "h-0.5 w-8 bg-gray-600 transition duration-500 ease-in-out"
          }
        />
        <div
          className={
            openMenu
              ? "opacity-0 transition duration-500 ease-in-out"
              : "h-0.5 w-8 bg-gray-600 transition duration-500 ease-in-out"
          }
        />
        <div
          className={
            openMenu
              ? "h-0.5 w-8 -rotate-45 bg-gray-600 transition duration-500 ease-in-out"
              : "h-0.5 w-8 bg-gray-600 transition duration-500 ease-in-out"
          }
        />
      </button> */}
      <h1 className="ml-4 flex items-center text-xl font-bold">国会劇場</h1>
      <div className="absolute right-2 flex h-full items-center">
        {/* TODO: icon */}
        {profile.length > 0 && (
          <img
            src={profile[0].avatar_url}
            alt=""
            className="size-8 rounded-full"
          />
        )}
      </div>

      {/* nav */}
      {/* <nav
        className={
          openMenu
            ? "fixed left-0 top-0 z-40 flex h-screen w-3/5 flex-col justify-start bg-white pt-8 text-left duration-300 ease-linear lg:w-1/5"
            : "fixed right-[-100%] duration-300 ease-linear"
        }
      >
        <ul className="ml-4 mt-6">
          <li className="">
            <a href="/login" className="inline-block py-2">
              管理者
            </a>
          </li>
          <li className="">
            <a href="/agenda" className="inline-block py-2">
              記事一覧
            </a>
          </li>
        </ul>
      </nav> */}
    </header>
  );
}
