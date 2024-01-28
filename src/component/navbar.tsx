// import "./styles.css";
import React, { useState } from "react";

export default function App() {
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuOpen = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <header className="ml-4 flex py-3 h-[5vh]">
      {/* humbergerbutton */}
      <button
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
      </button>
      <h1 className="flex items-center">国会劇場</h1>

      {/* nav */}
      <nav
        className={
          openMenu
            ? "fixed left-0 top-0 z-40 flex h-screen w-1/5 flex-col justify-start bg-white pt-8 text-left duration-300 ease-linear"
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
      </nav>
    </header>
  );
}
