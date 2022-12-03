import { client } from '@/shared/api/initClient_tenant';
import React, { useContext, useState } from 'react';
import { MySocket } from '../../Socket';
import TimeSeries from '../../TimeSeries';
import { TbTemperatureCelsius } from 'react-icons/tb';
import { SiOxygen } from 'react-icons/';
import {GiMedicalDrip} from 'react-icons/gi'
import { BiHeart } from 'react-icons/bi';

const MainContentCard = (
  { open, component, setInfoOpen, setIsDevice} = {
    open:null,
    component: '',
    setInfoOpen: null,
    setIsDevice: null,
  },
) => {
  // const [isOpenTimeSeries, setOpenTimeSeries] = useState(false);
  return (
    <div className="hover:shadow-xm z-10 mb-8 grid w-[100%] grid-cols-2  gap-4 divide-y-2 divide-gray-400 rounded-3xl bg-cyan-100 p-4 transition-all duration-300 ease-in-out hover:ring-2 hover:ring-gray-300">
      <div className="col-span-2 flex items-center justify-start">
        <div className="flex w-[30%] flex-col items-start justify-start">
          <div className="p-2 text-[18px] font-extrabold">{component.label}</div>
          <div className="px-4 text-[22px] font-semibold tracking-widest text-black">
            {component.Label}
          </div>
          <div className="px-4 text-[16px] font-semibold text-blue-600">
            {component.Type}
          </div>
          {component.Assign === 'No' ? (
            <div className="px-4 text-[14px] font-bold text-gray-400">
              Assigned: {component.Assign}
            </div>
          ) : (
            <div className="px-4 text-[14px] font-bold text-red-400">
              Assigned: {component.Assign}
            </div>
          )}
          {/* {isOpenTimeSeries && <TimeSeries client={client} />}
        <MySocket client={client} /> */}
        </div>
        {open ? (
          <div className="ml-auto flex h-[100%] w-[100%] items-center justify-center gap-[5rem] opacity-0">
            <div className="h-[100%] ">
              <TbTemperatureCelsius size={30} /> Telemetry 1
            </div>
            <div className="h-[100%] "><GiMedicalDrip size={30}/>Telemetry 2</div>
            <div className="h-[100%] "><BiHeart size={30} />Telemetry 3</div>
          </div>
        ) : (
          <div className="ml-auto flex h-[100%] w-[100%] items-center justify-center gap-[5rem]">
            <div className="h-[100%] ">
              <TbTemperatureCelsius size={30} />
              Telemetry 1
            </div>
            <div className="h-[100%] "><GiMedicalDrip size={30}/>Telemetry 2</div>
            <div className="h-[100%] "><BiHeart size={30} />Telemetry 3</div>
          </div>
        )}
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
