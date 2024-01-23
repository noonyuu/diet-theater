import { RxHamburgerMenu } from "react-icons/rx";

export const Navbar = () => {
  return (
    <div className="navbar sticky top-0 z-50 p-0 h-[10%] bg-main-color">
      <div className="flex-none">
        <button className="btn btn-ghost text-lg">
          <RxHamburgerMenu />
        </button>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">国会劇場</a>
      </div>
    </div>
  );
};
