import React, { useContext, useState } from 'react';
import { RiNurseFill } from 'react-icons/ri';

const MainContentCard = (
  { open, component, setInfoOpen, setIsNurse } = {
    open: null,
    component: '',
    setInfoOpen: null,
    setIsNurse: null,
  },
) => {
  return (
    <div className="shadow-lg z-10 mb-8  grid h-[20rem] w-[25%] grid-cols-2 grid-rows-5 gap-4 divide-y-2 divide-gray-400 rounded-3xl bg-cyan-100 p-4 transition-all duration-300 ease-in-out hover:ring-2 hover:ring-gray-300">
      <div className="col-span-2 row-span-4 flex flex-col items-center justify-between">
        <div className="bg-gray-400 w-[100%] h-[70%] row-span-3 rounded-2xl">Avatar</div>
        <div className="flex w-[30%] items-center justify-center">
          <div className="text-[22px] font-semibold tracking-widest text-black">
            <RiNurseFill />
          </div>
          <div className="text-[22px] font-semibold tracking-widest text-black">
            {component.Fname}
          </div>
          <div className="text-[22px] font-semibold tracking-widest text-black">
            {component.Lname}
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          setInfoOpen(true);
          setIsNurse(component);
        }}
        className="col-span-1 rounded bg-cyan-100 bg-opacity-5 p-4 text-base font-bold text-gray-400 transition-all duration-500 hover:bg-opacity-100 hover:text-gray-600  hover:ring-2 hover:ring-gray-200 focus:bg-cyan-200 focus:text-auto-black "
      >
        Details
      </button>
      <button className="col-span-1 rounded bg-cyan-100 bg-opacity-5 p-4 text-base font-bold text-gray-400 transition-all duration-500 hover:bg-opacity-100 hover:text-gray-600  hover:ring-2 hover:ring-gray-200">
        Update
      </button>
    </div>
  );
};

export default MainContentCard;
