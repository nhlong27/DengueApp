import React from 'react'


const MainContentCard = (
  { component, setInfoOpen } = {
    component: '',
    setInfoOpen: null,
    setIsPatient: null,
  },
) => {
  return (
    <div className="z-10 mb-8 flex w-[100%] items-center justify-start divide-y-2 divide-gray-400 rounded-lg bg-auto-white p-4 shadow-sm shadow-light-important ring-2 ring-gray-500 transition-all duration-1000 ease-in-out hover:shadow-lg hover:shadow-light-important">
      <div className="flex basis-[50%] items-center justify-start">
        <div className="p-2 text-[18px] font-extrabold">{component.title}</div>
        <div className="px-4 text-[12px] font-semibold text-light-important">
          Telemetry 1
        </div>
        <div className="px-4 text-[12px] font-semibold text-light-important">
          Telemetry 2
        </div>
        <div className="px-4 text-[12px] font-semibold text-light-important">
          Telemetry 3
        </div>
      </div>
      <button
        onClick={() => {
          setInfoOpen(true);
          setIsPatient(component);
        }}
        className="basis-[25%] rounded bg-cyan-100 bg-opacity-5 p-4 text-base font-bold text-gray-400 transition-all duration-500 hover:bg-opacity-100 hover:text-gray-600  hover:ring-2 hover:ring-gray-200 focus:bg-cyan-200 focus:text-auto-black "
      >
        Details
      </button>
      <button className="basis-[25%] rounded bg-cyan-100 bg-opacity-5 p-4 text-base font-bold text-gray-400 transition-all duration-500 hover:bg-opacity-100 hover:text-gray-600  hover:ring-2 hover:ring-gray-200">
        Update
      </button>
    </div>
  );
};


export default MainContentCard