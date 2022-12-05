import { client } from '@/shared/api/initClient_tenant';
import React, { useContext, useEffect, useState } from 'react';
import { MySocket } from '../../Socket';
import TimeSeries from '../../TimeSeries';
import { TbTemperatureCelsius } from 'react-icons/tb';
import { GiMedicalDrip } from 'react-icons/gi';
import { BiHeart } from 'react-icons/bi';
import { GrDevice } from 'react-icons/gr';
import { telemetryTable, handleTelemetry } from '../../ContentContainer';

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
  // const [close, setClose] = useState(false)
  const [change, setChange] = useState(false)
  const openSocket = async () => {
    let token = await client.connect();
    let params = {
      cmdId: 10,
      entityId: component.D_Id,
      startTs: mtd,
      endTs: now,
      // close: close
    };
    if (token) {
      client.subscribe(params, async function (response) {
        if (response && response.data) {
          console.log(response)
          handleTelemetry(
            component.D_Id,
            response.data.temperature[0][1],
            response.data.SpO2[0][1],
            response.data.HrtPressure[0][1],
            true,
          );
          setChange(state=>!state)
          // telemetryTable[`${component.D_Id}`] = {
          //   temperature: response.data.temperature[0][1],
          //   SpO2: response.data.SpO2[0][1],
          //   HrtPressure: response.data.HrtPressure[0][1],
          //   connected: true,
          // };
        }
      });
    } else {
      setTimeout(() => openSocket(), 3000);
    }
  };

  useEffect(() => {
    openSocket();
  }, []);
  // const [isOpenTimeSeries, setOpenTimeSeries] = useState(false);
  return (
    <div className="z-10 grid w-[100%] grid-cols-3 gap-4 divide-y-2 divide-gray-400 rounded-lg bg-auto-white p-4 shadow-lg transition-all duration-300 ease-in-out hover:bg-white hover:ring-2 hover:ring-gray-300">
      <div className="col-span-3 flex items-center justify-start">
        <div className="flex w-[30%] flex-col items-start justify-start">
          <div className="relative px-4 text-[22px] font-semibold tracking-widest text-black">
            <GrDevice />
            {telemetryTable[`${component.D_Id}`] &&
            telemetryTable[`${component.D_Id}`].connected ? (
              <div className="absolute top-0 -right-[4rem] text-[14px] text-green-500">
                Connected
              </div>
            ) : (
              <div className="absolute top-0 -right-[4rem] text-[14px] text-red-500">
                Disconnected
              </div>
            )}

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
            <div className="flex h-[100%] w-[20%] flex-col items-center justify-center">
              <div className="">
                <TbTemperatureCelsius size={40} color="blue" />{' '}
              </div>
              <div className="text-[20px] font-extrabold tracking-[5px] text-purple-600">
                {telemetryTable[`${component.D_Id}`] &&
                  telemetryTable[`${component.D_Id}`].temperature}
              </div>
            </div>
            <div className="flex h-[100%] w-[20%] flex-col items-center justify-center">
              <div className="">
                <GiMedicalDrip size={40} color="blue" />
              </div>
              <div className="text-[20px] font-extrabold tracking-[5px] text-cyan-600">
                {telemetryTable[`${component.D_Id}`] &&
                  telemetryTable[`${component.D_Id}`].SpO2}
              </div>
            </div>
            <div className="flex h-[100%] w-[20%] flex-col items-center justify-center">
              <div className="">
                <BiHeart size={40} color="blue" />
              </div>
              <div className="text-[20px] font-extrabold tracking-[5px] text-yellow-600">
                {telemetryTable[`${component.D_Id}`] &&
                  telemetryTable[`${component.D_Id}`].HrtPressure}
              </div>
            </div>
          </div>
        ) : (
          <div className="ml-auto flex h-[100%] w-[100%] items-center justify-center gap-[5rem]">
            <div className="flex h-[100%] w-[20%] flex-col items-center  justify-between p-2">
              <div className="">
                <TbTemperatureCelsius size={40} color="blue" />
              </div>
              <div className="text-[40px] font-extrabold tracking-[5px] text-purple-600">
                {telemetryTable[`${component.D_Id}`] &&
                  telemetryTable[`${component.D_Id}`].temperature}
              </div>
            </div>
            <div className="flex h-[100%] w-[20%] flex-col items-center justify-between p-2">
              <div className="">
                <GiMedicalDrip size={40} color="blue" />
              </div>
              <div className="text-[40px] font-extrabold tracking-[5px] text-cyan-600">
                {telemetryTable[`${component.D_Id}`] &&
                  telemetryTable[`${component.D_Id}`].SpO2}
              </div>
            </div>
            <div className="flex h-[100%] w-[20%] flex-col items-center justify-between p-2">
              <div className="">
                <BiHeart size={40} color="blue" />
              </div>
              <div className="text-[40px] font-extrabold tracking-[5px] text-yellow-600">
                {telemetryTable[`${component.D_Id}`] &&
                  telemetryTable[`${component.D_Id}`].HrtPressure}
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
        className="col-span-1 rounded bg-auto-white bg-opacity-5 p-4 text-base font-bold text-gray-400 transition-all duration-500 hover:bg-opacity-100 hover:text-gray-600  hover:ring-2 hover:ring-gray-200 focus:bg-cyan-200 focus:text-auto-black "
      >
        Details
      </button>
      <button className="col-span-1 rounded bg-auto-white bg-opacity-5 p-4 text-base font-bold text-gray-400 transition-all duration-500 hover:bg-opacity-100 hover:text-gray-600  hover:ring-2 hover:ring-gray-200">
        Update
      </button>
      <button
        onClick={() => {
          // setClose(true);
        }}
        className="col-span-1 rounded bg-auto-white bg-opacity-5 p-4 text-base font-bold text-gray-400 transition-all duration-500 hover:bg-opacity-100 hover:text-gray-600  hover:ring-2 hover:ring-gray-200"
      >
        Connect
      </button>
    </div>
  );
};

export default MainContentCard;
