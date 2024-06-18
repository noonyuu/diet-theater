import React, { useContext, useEffect, useState } from "react";
// context
import { GlobalContext } from "../context/GlobalContext";
import { useLocation, useNavigate } from "react-router-dom";
import { GetUser } from "../script/Auth";
// import { GetUser } from "../script/Auth";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const { profile, setProfile } = useContext(GlobalContext);
  const [openMenu, setOpenMenu] = useState(false);
  const [isLoad, setIsLoad] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [selectMenu, setSelectMenu] = useState<number>();

  // admin
  useEffect(() => {
    if (localStorage.getItem("admin")) {
      setAdmin(true);
    }
  }, []);
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

  const handleMenuOpen = () => {
    setOpenMenu(!openMenu);
  };

  // メニュー選択
  useEffect(()=>{
    if(location.pathname === "/secret/admin-agenda"){
      setSelectMenu(1);
    }else if (location.pathname === "/secret/theater-create-table") {
      setSelectMenu(2);
    } else if (location.pathname === "/secret/theater-edit") {
      setSelectMenu(3);
    } else if (location.pathname === "/secret/theater-other") {
      setSelectMenu(4);
    } else if (location.pathname === "/secret/logout") {
      setSelectMenu(5);
    }
  },[location.pathname])

  // メニュー選択->画面遷移
  const handleSelectMenu = (path: string) => {
    setOpenMenu(false);
    navigate(`/secret/${path}`);
  };

  return (
    <header className="fixed top-0 z-50 flex h-16 w-full bg-white shadow-md">
      {/* humbergerbutton */}
      {admin && (
        <button
          onClick={handleMenuOpen}
          type="button"
          className="z-50 space-y-2 px-4"
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
        </button>
      )}
      <h1 className="z-50 ml-4 flex items-center text-xl font-bold text-black">
        国会劇場
      </h1>
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
      <nav
        className={
          openMenu
            ? "fixed left-0 top-0 z-40 mt-16 flex h-screen w-3/5 flex-col justify-start bg-white pt-8 text-left duration-300 ease-linear lg:w-1/5"
            : "fixed right-[-100%] duration-300 ease-linear"
        }
      >
        <ul className="list-none space-y-4">
          {/* 劇一覧 */}
          <li
            className={
              selectMenu == 1
                ? "mx-2 rounded-md bg-blue-400 px-4 py-2 text-white"
                : "mx-2 px-4 py-2"
            }
          >
            <button
              type="button"
              onClick={() => handleSelectMenu("admin-agenda")}
              className="inline-block w-full text-start"
            >
              劇一覧<span className="float-end">&gt;</span>
            </button>
          </li>
          {/* 劇作成 */}
          <li
            className={
              selectMenu == 2
                ? "mx-2 rounded-md bg-blue-400 px-4 py-2 text-white"
                : "mx-2 px-4 py-2"
            }
          >
            <button
              type="button"
              onClick={() => handleSelectMenu("theater-create-table")}
              className="inline-block w-full text-start"
            >
              劇作成<span className="float-end">&gt;</span>
            </button>
          </li>
          {/* 劇編集 */}
          <li
            className={
              selectMenu == 3
                ? "mx-2 rounded-md bg-blue-400 px-4 py-2 text-white"
                : "mx-2 px-4 py-2"
            }
          >
            <button
              type="button"
              onClick={() => handleSelectMenu("theater-edit")}
              className="inline-block w-full text-start"
            >
              劇編集<span className="float-end">&gt;</span>
            </button>
          </li>
          {/* その他 */}
          <li
            className={
              selectMenu == 4
                ? "mx-2 rounded-md bg-blue-400 px-4 py-2 text-white"
                : "mx-2 px-4 py-2"
            }
          >
            <button
              type="button"
              onClick={() => handleSelectMenu("theater-other")}
              className="inline-block w-full text-start"
            >
              その他<span className="float-end">&gt;</span>
            </button>
          </li>
          {/* ログアウト */}
          <li
            className={
              selectMenu == 5
                ? "mx-2 rounded-md bg-blue-400 px-4 py-2 text-white"
                : "mx-2 px-4 py-2"
            }
          >
            <button
              type="button"
              onClick={() => handleSelectMenu("logout")}
              className="inline-block w-full text-start"
            >
              ログアウト<span className="float-end">&gt;</span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
