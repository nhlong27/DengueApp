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
import Prompt from './components-supabase/components/Prompt';
import { useAtom } from 'jotai';
import { userSession } from '../Auth';
import { notifList } from './App';
// import {useLocation} from 'react-router-dom'

const Navbar = (props) => {
  // const { session } = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isOpen, setDropDown] = useState(false);
  const [title, setTitle] = useState('Dashboard');

  const [session] = useAtom(userSession);
  const [notif] = useAtom(notifList);
  const [isMessageNotifOpen, setIsMessageNotifOpen] = useState(false);

  const getProfile = async () => {
    try {
      const { user } = session;

      let { data, error, status } = await supabase
        .from('DOCTOR')
        .select(`Username`)
        .eq('D_Ssn', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.Username);
        const { data: IMAGE, error } = await supabase.storage
          .from(`doctors/${user.id}`)
          .download('avatar.png');
        if (error) throw error;
        if (IMAGE) {
          const url = URL.createObjectURL(IMAGE);
          setAvatarUrl(url);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(async () => {
    await getProfile();

    return () => {
      setUsername(null);
    };
  }, []);
  return (
    <nav className="flex h-[10%] w-[100%] items-center justify-between bg-auto-white p-8 shadow-md">
      <div className="flex items-center justify-start">
        <div className="p-4 text-center text-[28px] font-extrabold tracking-[5px] text-blue-600">
          {props.location}
        </div>
        <Prompt heading={props.location} />
      </div>
      <div className="relative flex items-center justify-center gap-4 p-4 text-[22px]">
        <Link to="/dashboard/schedules">
          <GrSchedulePlay />
        </Link>
        <div className="relative">
          {notif ? (
            <>
              <BiMessageSquareDots
                onClick={() => setIsMessageNotifOpen((state) => !state)}
              />
              <div className="absolute -bottom-[2px] -right-[2px] h-[2px] w-[2px] rounded-full bg-red-500"></div>
              {isMessageNotifOpen && (
                <div className="absolute -bottom-[5rem] right-4 min-h-[5rem] min-w-[10rem] rounded-xl bg-auto-white p-4 ring-2 ring-black">
                  <Link
                    to="/dashboard/messages"
                    className="flex flex-col items-start justify-start "
                  >
                    <div className="text-[15px] font-bold text-blue-400">
                      {notif.Username}
                    </div>
                    <div className="text-[12px] text-black">{notif.Content}</div>
                  </Link>
                </div>
              )}
            </>
          ) : (
            <BiMessageSquareDots />
          )}
        </div>
        <button onClick={() => alert('The functionality for this does not yet exist')}>
          <IoMdNotificationsOutline />
        </button>
        <span className="flex items-center justify-center rounded-2xl p-2 text-[18px] font-extrabold tracking-[5px]">
          {username ? username : 'Default User'}
        </span>
        <button
          className="flex items-center gap-2"
          onClick={(e) => {
            setDropDown((state) => !state);
            e.stopPropagation();
          }}
        >
          {avatarUrl ? (
            <img
              className="inline-block h-8 w-8 rounded-full bg-auto-black ring-2 ring-black hover:opacity-70"
              src={avatarUrl ? avatarUrl : `https://place-hold.it/150x150`}
              alt={avatarUrl ? 'Avatar' : 'No image'}
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
          to="/dashboard/account"
          className="block w-full px-4 py-2 text-left text-sm  hover:bg-slate-200 hover:text-black"
        >
          Profile
        </Link>
        <Link
          className="block w-full px-4 py-2 text-left text-sm hover:bg-slate-200 hover:text-black"
          onClick={() => {
            props.setLocation('Settings');
          }}
          to="/dashboard/settings"
        >
          Settings
        </Link>
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
