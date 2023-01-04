import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { TbBuildingHospital } from 'react-icons/tb';
import { RiNurseLine } from 'react-icons/ri';
import { TbDeviceWatch } from 'react-icons/tb';
import { MdOutlineSchedule } from 'react-icons/md';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { AiOutlineLeft } from 'react-icons/ai';
import { AiOutlineRight } from 'react-icons/ai';
import {BsChatLeftDots} from 'react-icons/bs'
import { BsCalendar2Date } from 'react-icons/bs';

import { FiSettings } from 'react-icons/fi';

const Sidebar = (props) => {
  const [isOpen, setOpen] = useState(false);
  const open = isOpen ? 'w-[15%]  rounded-r-lg' : 'w-[5%] my-4 rounded-2xl ml-4';

  return (
    <div
      className={`${open} relative flex min-w-[5rem] shrink-0 flex-col bg-black transition-all duration-500`}
    >
      <Link
        to="/dashboard/"
        className="mb-8 flex h-[10%] items-center justify-start p-4 text-large font-bold text-auto-white"
      >
        {isOpen ? (
          <>
            <img
              className="mr-4 h-[3rem] w-[3rem] transition-all duration-500"
              src="../../../../assets/img/mos_files/mos.png"
              alt="mos"
            />
            <span className="opacity-100 transition-opacity duration-500">DengueApp</span>
          </>
        ) : (
          <>
            <img
              className="h-[2.5rem] w-[2.5rem] transition-all duration-500"
              src="../../../../assets/img/mos_files/mos.png"
              alt="mos"
            />
            <span className="opacity-0 transition-opacity duration-500">DengueApp</span>
          </>
        )}
      </Link>

      {isOpen ? (
        <>
          <button
            onClick={() => setOpen((state) => !state)}
            className="absolute top-[5.3rem] -right-[1rem] flex w-[4rem] items-center justify-center rounded-full bg-blue-600 p-3 ring-2 ring-black"
          >
            <AiOutlineLeft color="white" size={20} />
          </button>
          <div className="ml-8 mr-12 border-t-2 border-auto-white p-4"></div>
          <div className="mr-2 flex flex-col gap-2 pb-8 ">
            <Link
              onClick={() => props.setLocation('Dashboard')}
              to="/dashboard/"
              className="duration-400 my-2 flex items-center justify-start py-2  px-8 text-[17px] tracking-wider text-auto-white transition-all hover:border-r-4  hover:border-auto-white hover:pl-12 hover:text-[19px] focus:border-r-4 focus:border-auto-white  focus:pl-12 focus:text-[17px] focus:text-auto-white "
            >
              <RxDashboard size={20} />
              <span className="mx-auto">Dashboard</span>
            </Link>
            <Link
              onClick={() => props.setLocation('Facilities')}
              to="/dashboard/facilities"
              className="duration-400 my-2 flex items-center justify-start py-2  px-8 text-[17px] tracking-wider text-auto-white transition-all hover:border-r-4  hover:border-auto-white hover:pl-12 hover:text-[19px] focus:border-r-4 focus:border-auto-white  focus:pl-12 focus:text-[17px] focus:text-auto-white"
            >
              <TbBuildingHospital size={20} />
              <span className="mx-auto">Facilities</span>
            </Link>
            <Link
              onClick={() => props.setLocation('Nurses')}
              to="/dashboard/nurses"
              className="duration-400 my-2 flex items-center justify-start py-2  px-8 text-[17px] tracking-wider text-auto-white transition-all hover:border-r-4  hover:border-auto-white hover:pl-12 hover:text-[19px] focus:border-r-4 focus:border-auto-white  focus:pl-12 focus:text-[17px] focus:text-auto-white"
            >
              <RiNurseLine size={22} />
              <span className="mx-auto">Nurses</span>
            </Link>
            <Link
              onClick={() => props.setLocation('Devices')}
              to="/dashboard/devices"
              className="duration-400 my-2 flex items-center justify-start py-2  px-8 text-[17px] tracking-wider text-auto-white transition-all hover:border-r-4  hover:border-auto-white hover:pl-12 hover:text-[19px] focus:border-r-4 focus:border-auto-white  focus:pl-12 focus:text-[17px] focus:text-auto-white"
            >
              <TbDeviceWatch size={24} />
              <span className="mx-auto">Devices</span>
            </Link>
          </div>
          <div className="ml-8 mr-12 border-t-2 border-auto-white p-4"></div>
          <div className="mr-2 flex flex-col gap-2 pb-8">
            <Link
              onClick={() => props.setLocation('Schedules')}
              to="/dashboard/schedules"
              className="duration-400 my-2  flex items-center p-4  py-2 px-8 text-[17px] tracking-wider text-auto-white transition-all hover:border-r-4  hover:border-auto-white hover:pl-12 hover:text-[19px] focus:border-r-4 focus:border-auto-white  focus:pl-12 focus:text-[17px] focus:text-auto-white"
            >
              <BsCalendar2Date size={20} />
              <span className="mx-auto">Schedule</span>
            </Link>
            <Link
              onClick={() => props.setLocation('Messages')}
              to="/dashboard/messages"
              className="duration-400 my-2 flex items-center p-4 py-2 px-8  text-[17px] tracking-wider text-auto-white transition-all hover:border-r-4  hover:border-auto-white hover:pl-12 hover:text-[19px] focus:border-r-4 focus:border-auto-white  focus:pl-12 focus:text-[17px] focus:text-auto-white"
            >
              <BsChatLeftDots size={18} />
              <span className="mx-auto">Messages</span>
            </Link>
            <div
              onClick={() => {
                setEmuOpen(true);
              }}
              className="duration-400 my-2 mt-12 flex items-center p-4 py-2 px-8  text-[17px] tracking-wider text-auto-white transition-all hover:border-r-4  hover:border-auto-white hover:pl-12 hover:text-[19px] focus:border-r-4 focus:border-auto-white  focus:pl-12 focus:text-[17px] focus:text-auto-white"
            >
              <FiSettings size={20} />
              <span className="mx-auto">Settings</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => setOpen((state) => !state)}
            className="absolute top-[5.3rem] -right-[1rem] flex w-[4rem] items-center justify-center rounded-full bg-blue-600 p-3 ring-2 ring-black"
          >
            <AiOutlineRight color="white" size={20} />
          </button>
          <div className="ml-[1.4rem] mr-12 border-t-2 border-auto-white p-4"></div>
          <div className="mr-0 flex flex-col gap-2 pb-8">
            <Link
              onClick={() => props.setLocation('Dashboard')}
              to="/dashboard/"
              className="duration-400 my-2 flex items-center justify-center py-2 text-[20px] tracking-wider text-auto-white transition-all hover:border-r-4  hover:border-auto-white  hover:text-[22px] focus:border-r-4 focus:border-auto-white   focus:text-[22px] focus:text-auto-white "
            >
              <RxDashboard size={23} />
              {/* <span className="hidden">Dashboard</span> */}
            </Link>
            <Link
              onClick={() => props.setLocation('Facilities')}
              to="/dashboard/facilities"
              className="duration-400 my-2 flex items-center justify-center py-2   text-[20px] tracking-wider text-auto-white transition-all hover:border-r-4  hover:border-auto-white  hover:text-[22px] focus:border-r-4 focus:border-auto-white   focus:text-[22px] focus:text-auto-white"
            >
              <TbBuildingHospital size={24} />
              {/* <span className="hidden">Facilities</span> */}
            </Link>
            <Link
              onClick={() => props.setLocation('Nurses')}
              to="/dashboard/nurses"
              className="duration-400 my-2 flex items-center justify-center py-2   text-[20px] tracking-wider text-auto-white transition-all hover:border-r-4  hover:border-auto-white  hover:text-[22px] focus:border-r-4 focus:border-auto-white   focus:text-[22px] focus:text-auto-white"
            >
              <RiNurseLine size={23} />
              {/* <span className="hidden">Nurses</span> */}
            </Link>
            <Link
              onClick={() => props.setLocation('Devices')}
              to="/dashboard/devices"
              className="duration-400 my-2 flex items-center justify-center py-2   text-[20px] tracking-wider text-auto-white transition-all hover:border-r-4  hover:border-auto-white  hover:text-[22px] focus:border-r-4 focus:border-auto-white   focus:text-[22px] focus:text-auto-white"
            >
              <TbDeviceWatch size={25} />
              {/* <span className="hidden">Devices</span> */}
            </Link>
          </div>
          <div className="ml-[1.4rem] mr-12 border-t-2 border-auto-white p-4"></div>
          <div className="mr-0 flex flex-col gap-2 pb-8">
            <Link
              onClick={() => props.setLocation('Schedules')}
              to="/dashboard/schedules"
              className="duration-400 justify p-center  my-2 flex items-center justify-center py-2  text-[20px]  tracking-wider text-auto-white transition-all hover:border-r-4  hover:border-auto-white  hover:text-[22px] focus:border-r-4 focus:border-auto-white   focus:text-[22px] focus:text-auto-white"
            >
              <BsCalendar2Date size={22} />
              {/* <span className="hidden">Schedule</span> */}
            </Link>
            <Link
              onClick={() => props.setLocation('Messages')}
              to="/dashboard/messages"
              className="duration-400 p-center my-2 flex items-center justify-center py-2  text-[20px] tracking-wider text-auto-white transition-all hover:border-r-4  hover:border-auto-white  hover:text-[22px] focus:border-r-4 focus:border-auto-white   focus:text-[22px] focus:text-auto-white"
            >
              <BsChatLeftDots size={20} />
              {/* <span className="hidden">Notifs</span> */}
            </Link>
            <Link
              onClick={() => {
                props.setLocation('Settings');
              }}
              to='/dashboard/settings'
              className="duration-400 p-center my-2 mt-8 flex items-center justify-center py-2  text-[20px] tracking-wider text-auto-white transition-all hover:border-r-4  hover:border-auto-white  hover:text-[22px] focus:border-r-4 focus:border-auto-white   focus:text-[22px] focus:text-auto-white"
            >
              <FiSettings size={20} />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};


export default Sidebar;
