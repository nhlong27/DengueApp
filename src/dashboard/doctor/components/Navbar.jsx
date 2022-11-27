import React from 'react';
import {useRef, useState, useEffect} from 'react';

const Navbar = () => {
  const [isOpen, setDropDown] = useState(false);
  // const menuRef = useRef();
  // const closeOpenMenus = (e)=> {
  //   if (isOpen && !menuRef.current.contains(e.target)) {
  //     setDropDown(false);
  //   }
  // };
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     window.addEventListener("mousedown", (e) => closeOpenMenus(e));
  //   }
  //   return () => {
  //     if (typeof window !== "undefined") {
  //       window.removeEventListener("mousedown", (e) => closeOpenMenus(e));
  //     }
  //   };
  // }, []);

  return (
    <nav className="flex h-[10%] w-[100%] items-center justify-between bg-gray-100 p-8 shadow-sm">
      <div className="p-4 text-center text-large text-auto-black">Dashboard</div>
      <div className="relative p-4">
        <span>Very Long Name</span>
        <img
          onClick={(e) => {
            setDropDown((state) => !state);
            e.stopPropagation();
          }}
          className="ml-8 inline-block h-8 w-8 rounded-full bg-auto-black ring-2 ring-auto-white hover:opacity-70"
          alt=""
        ></img>
        {isOpen && <DropDownMenu />}
      </div>
    </nav>
  );
};

export const DropDownMenu = (props) => {
  return (
    <div
      className={`absolute top-[4rem] right-[2rem] z-20 w-45 origin-top-right rounded-lg bg-white shadow-lg ring-2 ring-black ring-opacity-5`}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex={-1}
    >
      <div className="py-1" role="none">
         <a
          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-slate-200"
          href="#"
        >
          Profile
        </a>
        <a
          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-slate-200"
          href="#"
        >
          Account Settings
        </a>
        <a
          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-slate-200"
          href="#"
        >
          Support
        </a>

        <form method="POST" action="#" role="none">
          <button
            type="submit"
            className="block w-full border-t-2 border-gray-100 px-4 py-2 text-left text-sm text-gray-700 hover:bg-slate-200"
            role="menuitem"
            tabIndex={-1}
            id="menu-item-3"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
};
export default Navbar;
