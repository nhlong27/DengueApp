import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="flex w-[15%] shrink-0 flex-col bg-gradient-to-r from-auto-black to-gray-700">
      <Link
        to="/pages/dashboard/doctor/index.html"
        className="mx-4 mb-8 flex h-[10%] items-center justify-start p-4 text-large text-auto-white"
      >
        Logo space
      </Link>
      <div className="ml-8 mr-12 border-t-2 border-auto-white p-4"></div>
      <div className="mr-2 flex flex-col gap-2 pb-8 ">
        <Link
          to="/pages/dashboard/doctor/index.html"
          className="duration-400 flex items-center justify-start p-4  px-8 text-auto-white transition-all hover:border-r-2 hover:border-auto-white hover:bg-gradient-to-r hover:from-light-important hover:pl-12 hover:text-[17px] focus:border-r-2 focus:border-auto-white focus:bg-gradient-to-r focus:from-light-important focus:pl-12 focus:text-[17px] focus:text-auto-white "
        >
          Dashboard
        </Link>
        <Link
          to="/pages/dashboard/doctor/facilities"
          className="duration-400 flex items-center justify-start p-4  px-8 text-auto-white transition-all hover:border-r-2 hover:border-auto-white hover:bg-gradient-to-r hover:from-light-important hover:pl-12 hover:text-[17px] focus:border-r-2 focus:border-auto-white focus:bg-gradient-to-r focus:from-light-important focus:pl-12 focus:text-[17px] focus:text-auto-white"
        >
          Facilities
        </Link>
        <Link
          to="/pages/dashboard/doctor/nurses"
          className="duration-400 flex items-center justify-start p-4  px-8 text-auto-white transition-all hover:border-r-2 hover:border-auto-white hover:bg-gradient-to-r hover:from-light-important hover:pl-12 hover:text-[17px] focus:border-r-2 focus:border-auto-white focus:bg-gradient-to-r focus:from-light-important focus:pl-12 focus:text-[17px] focus:text-auto-white"
        >
          Nurses
        </Link>
        <Link
          to="/pages/dashboard/doctor/devices"
          className="duration-400 flex items-center justify-start p-4  px-8 text-auto-white transition-all hover:border-r-2 hover:border-auto-white hover:bg-gradient-to-r hover:from-light-important hover:pl-12 hover:text-[17px] focus:border-r-2 focus:border-auto-white focus:bg-gradient-to-r focus:from-light-important focus:pl-12 focus:text-[17px] focus:text-auto-white"
        >
          Devices
        </Link>
      </div>
      <div className="ml-8 mr-12 border-t-2 border-auto-white p-4"></div>
      <div className="mr-2 flex flex-col gap-2 pb-8">
        <div className="duration-400 flex items-center  justify-start  p-4 px-8 text-auto-white transition-all hover:border-r-2 hover:border-auto-white hover:bg-gradient-to-r hover:from-light-important hover:pl-12 hover:text-[17px] focus:border-r-2 focus:border-auto-white focus:bg-gradient-to-r focus:from-light-important focus:pl-12 focus:text-[17px] focus:text-auto-white">
          Schedule
        </div>
        <div className="duration-400 flex items-center justify-start p-4 px-8  text-auto-white transition-all hover:border-r-2 hover:border-auto-white hover:bg-gradient-to-r hover:from-light-important hover:pl-12 hover:text-[17px] focus:border-r-2 focus:border-auto-white focus:bg-gradient-to-r focus:from-light-important focus:pl-12 focus:text-[17px] focus:text-auto-white">
          Notif
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
