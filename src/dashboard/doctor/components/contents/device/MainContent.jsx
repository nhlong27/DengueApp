import React, { useState, useEffect } from 'react';
import MainContentCard from './MainContentCard';
import { db_doctor } from '@/dashboard/doctor/App';

const MainContent = () => {
  const [avai, setAvai] = useState(false);
  useEffect(() => {
    if (db_doctor.deviceList) {
      setAvai(true);
    }
  }, [db_doctor.deviceList]);
  const [isOpen, setOpen] = useState(false);
  const [isDevice, setIsDevice] = useState({});
  let style1 = '';
  let style2 = '';
  if (isOpen) {
    style1 = '';
    style2 = 'w-[40%]';
  } else {
    style1 = '-mr-[32rem] opacity-0';
    style2 = 'w-[100%]';
  }
  if (avai) {
    return (
      <>
        <div
          className={`${style2} flex flex-wrap items-start justify-around transition-all duration-500`}
        >
          {Object.values(db_doctor.deviceList).map((device, index) => {
            return (
              <MainContentCard
                setInfoOpen={setOpen}
                key={index}
                component={device}
                setIsDevice={setIsDevice}
              />
            );
          })}
        </div>

        <div
          className={` ${style1} absolute top-0 right-0 z-20 h-[100%] w-[50%]  rounded-l-lg bg-auto-white shadow-lg shadow-light-important transition-all duration-500 ease-in-out`}
        >
          <div className="flex w-[100%] flex-col items-center justify-start gap-4 p-4">
            <button
              onClick={() => {
                setOpen(false);
              }}
              className="absolute top-[14rem] -left-[2.8rem] rounded bg-light-important p-4 font-bold text-auto-white shadow-lg hover:bg-cyan-300 hover:text-white"
            >
              Close
            </button>
            <div className="flex w-[100%] flex-row items-center justify-between bg-white text-large font-extrabold text-auto-black shadow-sm">
              Device Details
            </div>

            {isDevice && (
              <div className="flex w-[100%] flex-row items-center justify-between rounded bg-auto-white p-2 shadow-lg shadow-gray-200 ring-2 ring-gray-200 hover:bg-white hover:ring-2 hover:ring-gray-300">
                <div>{isDevice.label}</div>
                <div>Type: {isDevice.type}</div>
                <div>Id: {isDevice.name}</div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  } else {
    return <div>Loading content...</div>;
  }
};

export default MainContent;
