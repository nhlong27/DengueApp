import React from 'react';

const MainContentCard = (
  { component, setInfoOpen } = {
    component: '',
    setInfoOpen: null,
    setIsDevice: null,
  },
) => {
  return (
    <div className="z-10 mb-8 grid w-[100%] grid-cols-2 gap-4  divide-y-2 divide-gray-400 rounded-lg bg-auto-white p-4 shadow-sm shadow-light-important ring-2 ring-gray-500 transition-all duration-1000 ease-in-out hover:shadow-lg hover:shadow-light-important">
      <div className="col-span-2 flex flex-col items-start justify-start">
        <div className="p-2 text-[18px] font-extrabold">{component.label}</div>
        <div className="px-4 text-[12px] font-semibold text-light-important">
          Type: {component.type}
        </div>
        <div className="px-4 text-[12px] font-semibold text-light-important">
          Id: {component.name}
        </div>
        <div className="px-4 text-[14px]">Assigned</div>
      </div>
      <button
        onClick={() => {
          setInfoOpen(true);
          setIsDevice(component);
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
