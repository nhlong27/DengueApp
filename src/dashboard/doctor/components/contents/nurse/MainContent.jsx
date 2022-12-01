import { db_doctor } from '@/dashboard/doctor/App';
import React, { useEffect, useState } from 'react';

const MainContent = () => {
  const [avai, setAvai] = useState(false);
  const [isNurse, setIsNurse] = useState({});
  useEffect(() => {
    if (db_doctor.nurseList) {
      setAvai(true);
    }
  }, [db_doctor.nurseList]);
  const [isOpen, setOpen] = useState(false);
  let style1 = '';
  let style2 = '';
  if (isOpen) {
    style1 = 'z-20';
    style2 = 'z-0';
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
          {Object.values(db_doctor.nurseList).map((nurse, index) => {
            return (
              <MainContentCard
                setInfoOpen={setOpen}
                key={index}
                component={nurse}
                setIsNurse={setIsNurse}
              />
            );
          })}
        </div>

        <div
          className={` ${style1} absolute top-0 right-0 left-0 z-20 h-screen w-[100%] rounded-l-lg bg-auto-white shadow-lg shadow-light-important transition-all duration-500 ease-in-out`}
        >
          <div className="flex w-[100%] flex-col items-center justify-start gap-4 p-4">
            <button
              onClick={() => {
                setOpen(false);
              }}
              className="absolute top-0 left-0 rounded bg-light-important p-4 font-bold text-auto-white shadow-lg hover:bg-cyan-300 hover:text-white"
            >
              Back
            </button>
            <div className="flex w-[100%] flex-row items-center justify-between bg-white text-large font-extrabold text-auto-black shadow-sm">
              All rooms
            </div>

            {isNurse && (
              <div className="flex w-[100%] flex-row items-center justify-between rounded bg-auto-white p-2 shadow-lg shadow-gray-200 ring-2 ring-gray-200 hover:bg-white hover:ring-2 hover:ring-gray-300">
                <div>TODO - Room list: {db_doctor.roomList.name}</div>
                <div>Nusre clicked: {isNurse.name}</div>
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
