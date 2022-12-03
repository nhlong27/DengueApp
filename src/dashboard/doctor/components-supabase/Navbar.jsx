import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../App';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { GrSchedulePlay } from 'react-icons/gr';
import { BiMessageSquareDots } from 'react-icons/bi';
import { IoMdNotificationsOutline } from 'react-icons/io';

const Navbar = () => {
  const { session } = useContext(AppContext);
  const [username, setUsername] = useState('');
  const { avatar_url, setAvatarUrl } = useState('');
  const [isOpen, setDropDown] = useState(false);
  const { user } = session;
  // console.log(session);
  const getProfile = async () => {
    let { data } = await supabase
      .from('profiles')
      .select(`Email`)
      .eq('id', user.id)
      .single();
    if (data) {
      setUsername(data.Email);
    }
  };
  useEffect(() => {}, []);
  return (
    <nav className="flex h-[10%] w-[100%] items-center justify-between bg-cyan-50 p-8 shadow-sm">
      <div className="p-4 text-center text-[28px] font-extrabold tracking-widest text-blue-600">
        Dashboard
      </div>
      <div className="relative flex gap-4 p-4 text-[22px] justify-center items-center">
        <button><GrSchedulePlay /></button>
        <button><BiMessageSquareDots /></button>
        <button><IoMdNotificationsOutline /></button>
        <span className='text-[18px] p-2 flex justify-center items-center rounded-2xl ring-2 ring-cyan-100'>{user.email}</span>
        <img
          onClick={(e) => {
            setDropDown((state) => !state);
            e.stopPropagation();
          }}
          className="ml-2 ring-2 ring-cyan-100 inline-block h-8 w-8 rounded-full bg-auto-black hover:opacity-70"
          alt=""
          src={avatar_url}
        ></img>
        {isOpen && <DropDownMenu />}
      </div>
    </nav>
  );
};

export const DropDownMenu = (props) => {
  return (
    <div
      className={`w-45 absolute top-[4rem] right-[2rem] z-20 origin-top-right rounded-lg bg-white shadow-lg ring-2 ring-black ring-opacity-5`}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex={-1}
    >
      <div className="py-1" role="none">
        <a
          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-slate-200"
          href="/pages/dashboard/doctor/account"
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
