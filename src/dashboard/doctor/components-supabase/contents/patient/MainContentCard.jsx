import React, { useContext, useState } from 'react';
import { BsPeopleFill } from 'react-icons/bs';

const MainContentCard = (
  { open, component, setInfoOpen, setIsPatient } = {
    open: null,
    component: '',
    setInfoOpen: null,
    setIsPatient: null,
  },
) => {
  return (
    <div
      onClick={() => {
        setInfoOpen(true);
        setIsPatient(component);
      }}
      className="z-10 flex h-[4rem] w-[100%] items-center justify-start gap-4 rounded-lg bg-auto-white p-2 shadow-lg transition-all duration-300 ease-in-out hover:bg-white hover:ring-2 hover:ring-gray-300"
    >
      <div className="h-[80%] w-[4%] ring-2 ring-white rounded-full bg-green-400">Status</div>
      <div className="grid h-[100%] min-w-[20%] grid-cols-2 grid-rows-2 items-center justify-between">
        <div className="col-span-2 row-span-1 flex items-center justify-center rounded-sm border-b-2 border-gray-300  ">
          <div className="text-[18px] font-semibold tracking-[3px] text-black">
            <BsPeopleFill />
          </div>
          <div className="text-[18px] font-semibold tracking-[3px] text-black">
            {component.Fname}
          </div>
          <div className="text-[18px] font-semibold tracking-[3px] text-black">
            {component.Lname}
          </div>
        </div>
        <div className="col-span-2 row-span-1 grid h-[50%] w-[100%] grid-cols-2"></div>
      </div>
      <button className="ml-auto rounded bg-cyan-100 bg-opacity-5 p-4 text-base font-bold text-gray-400 transition-all duration-500 hover:bg-opacity-100 hover:text-gray-600  hover:ring-2 hover:ring-gray-200">
        Update
      </button>
    </div>
  );
};

export default MainContentCard;
