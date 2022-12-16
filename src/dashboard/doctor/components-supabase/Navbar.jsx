import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { useContext } from 'react';
// import { AppContext } from '../App';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { GrSchedulePlay } from 'react-icons/gr';
import { BiMessageSquareDots } from 'react-icons/bi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { InfinitySpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { AiOutlineDown } from 'react-icons/ai';
// import {useLocation} from 'react-router-dom'

const Navbar = (props) => {
  // const { session } = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [avatar_url, setAvatarUrl] = useState('');
  const [isOpen, setDropDown] = useState(false);
  const [title, setTitle] = useState('Dashboard');

  const getProfile = async () => {
    try {
      const { user } = props.session;

      let { data, error, status } = await supabase
        .from('DOCTOR')
        .select(`Username, Avatar_url`)
        .eq('D_Ssn', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.Username);
        setAvatarUrl(data.Avatar_url);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <nav className="flex h-[10%] w-[100%] items-center justify-between bg-auto-white p-8 shadow-md">
      <div className="p-4 text-center text-[28px] font-extrabold tracking-[5px] text-blue-600">
        {props.location}
      </div>
      <div className="relative flex items-center justify-center gap-4 p-4 text-[22px]">
        <Link to="/pages/dashboard/doctor/schedules">
          <GrSchedulePlay />
        </Link>
        <Link to="/pages/dashboard/doctor/messages">
          <BiMessageSquareDots />
        </Link>
        <button onClick={() => alert('The functionality for this does not yet exist')}>
          <IoMdNotificationsOutline />
        </button>
        <span className="flex items-center justify-center rounded-2xl p-2 text-[18px] font-extrabold tracking-[10px]">
          {username ? username : 'Default User'}
        </span>
        <button
          className="flex items-center gap-2"
          onClick={(e) => {
            setDropDown((state) => !state);
            e.stopPropagation();
          }}
        >
          {avatar_url ? (
            <img
              className="inline-block h-8 w-8 rounded-full bg-auto-black ring-2 ring-cyan-100 hover:opacity-70"
              alt=""
              src={avatar_url}
            ></img>
          ) : (
            <div className="h-[2rem] w-[2rem] rounded-full bg-gray-400"></div>
          )}
          <AiOutlineDown size={15} />
        </button>
        {isOpen && <DropDownMenu setLocation={props.setLocation} />}
      </div>
    </nav>
  );
};

export const DropDownMenu = (props) => {
  return (
    <div
      className={`absolute  top-[4rem] right-[2rem] z-20 w-[13rem] origin-top-right rounded-lg bg-auto-white p-2 text-black shadow-lg ring-2 ring-black`}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex={-1}
    >
      <div className=" py-1" role="none">
        <Link
          onClick={() => {
            props.setLocation('Profile');
          }}
          to="/pages/dashboard/doctor/account"
          className="block w-full px-4 py-2 text-left text-sm  hover:bg-slate-200 hover:text-black"
        >
          Profile
        </Link>
        <a
          className="block w-full px-4 py-2 text-left text-sm hover:bg-slate-200 hover:text-black"
          href="#"
        >
          Settings
        </a>
        {/* <a
          className="block w-full px-4 py-2 text-left text-sm hover:bg-slate-200 hover:text-black"
          href="#"
        >
          Support
        </a> */}

        <button
          type="button"
          className="block w-full border-t-2 border-gray-300 px-4 py-2 text-left text-sm hover:bg-slate-200 hover:text-black"
          role="menuitem"
          tabIndex={-1}
          id="menu-item-3"
          onClick={async () => {
            let { error } = await supabase.auth.signOut();
          }}
        >
          Sign out
        </button>
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
