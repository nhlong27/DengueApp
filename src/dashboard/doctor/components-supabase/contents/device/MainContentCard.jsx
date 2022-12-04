import { client } from '@/shared/api/initClient_tenant';
import React, { useContext, useEffect, useState } from 'react';
import { MySocket } from '../../Socket';
import TimeSeries from '../../TimeSeries';
import { TbTemperatureCelsius } from 'react-icons/tb';
import { GiMedicalDrip } from 'react-icons/gi';
import { BiHeart } from 'react-icons/bi';
import { GrDevice } from 'react-icons/gr';

const now = Date.now();
const mtd = now - 3600000;

const MainContentCard = (
  { open, component, setInfoOpen, setIsDevice } = {
    open: null,
    component: '',
    setInfoOpen: null,
    setIsDevice: null,
  },
) => {
  const [connected, setConnected] = useState(false);
  const [telemetry, setTelemetry] = useState(null);

  const openSocket = async () => {
    let token = await client.connect();
    let params = {
      cmdId: 10,
      entityId: component.D_Id,
      startTs: mtd,
      endTs: now,
    };
    if (token) {
      client.subscribe(params, async function (response) {
        if (response && response.data) {
          setTelemetry(response.data);
        }
      });
    } else {
      setTimeout(() => openSocket(), 3000);
    }
  };

  useEffect(() => {
    if (connected) {
      console.log('subscribing');
      openSocket();
    } else {
      console.log('closed connection');
    }
  }, [connected]);
  // const [isOpenTimeSeries, setOpenTimeSeries] = useState(false);
  return (
    <div className="z-10 grid w-[100%] grid-cols-3 gap-4 divide-y-2 divide-gray-400 rounded-3xl bg-cyan-100 p-4 shadow-lg transition-all duration-300 ease-in-out hover:ring-2 hover:ring-gray-300">
      <div className="col-span-3 flex items-center justify-start">
        <div className="flex w-[30%] flex-col items-start justify-start">
          <div className="px-4 text-[22px] font-semibold tracking-widest text-black">
            <GrDevice />
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
          <div className="ml-auto flex h-[100%] w-[100%] items-center justify-center gap-[1.8rem]">
            <div className="h-[100%] w-[20%] flex flex-col justify-center items-center">
              <div className=''>

              <TbTemperatureCelsius size={40} color='blue' />{' '}
              </div>
              <div className='text-[20px] tracking-[5px] font-extrabold text-purple-600'>

              {telemetry ? telemetry.temperature[0][1] : 0}
              </div>
            </div>
            <div className="h-[100%] w-[20%] flex flex-col justify-center items-center">
              <div className=''>

              <GiMedicalDrip size={40} color='blue' />
              </div>
              <div className='text-[20px] tracking-[5px] font-extrabold text-cyan-600'>

              {telemetry ? telemetry.SpO2[0][1] : 0}
              </div>
            </div>
            <div className="h-[100%] w-[20%] flex flex-col justify-center items-center">
              <div className=''>

              <BiHeart size={40} color='blue' />
              </div>
              <div className='text-[20px] tracking-[5px] font-extrabold text-yellow-600'>

              {telemetry ? telemetry.HrtPressure[0][1] : 0}
              </div>
            </div>
          </div>
        ) : (
          <div className="ml-auto flex h-[100%] w-[100%] items-center justify-center gap-[5rem]">
            <div className="h-[100%] w-[20%] flex flex-col p-2  justify-between items-center">
              <div className=''>

              <TbTemperatureCelsius size={40} color='blue' />
              </div>
              <div className='text-[40px] tracking-[5px] font-extrabold text-purple-600'>

              {telemetry ? telemetry.temperature[0][1] : 0}
              </div>
            </div>
            <div className="h-[100%] w-[20%] flex flex-col p-2 justify-between items-center">
              <div className=''>

              <GiMedicalDrip size={40} color='blue' />
              </div>
              <div className='text-[40px] tracking-[5px] font-extrabold text-cyan-600'>

              {telemetry ? telemetry.SpO2[0][1] : 0}
              </div>
            </div>
            <div className="h-[100%] w-[20%] flex flex-col p-2 justify-between items-center">
              <div className=''>

              <BiHeart size={40} color='blue' />
              </div>
              <div className='text-[40px] tracking-[5px] font-extrabold text-yellow-600'>

              {telemetry ? telemetry.HrtPressure[0][1] : 0}
              </div>
            </div>
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
      <button
        onClick={() => {
          setConnected((state) => !state);
        }}
        className="col-span-1 rounded bg-cyan-100 bg-opacity-5 p-4 text-base font-bold text-gray-400 transition-all duration-500 hover:bg-opacity-100 hover:text-gray-600  hover:ring-2 hover:ring-gray-200"
      >
        Connect
      </button>
    </div>
  );
};

export default MainContentCard;
