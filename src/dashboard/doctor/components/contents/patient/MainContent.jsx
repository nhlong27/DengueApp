import React, { useState, useEffect } from 'react';
import MainContentCard from './MainContentCard';
import { db_doctor } from '@/dashboard/doctor/App';

const MainContent = () => {
  const [avai, setAvai] = useState(false);
  useEffect(() => {
    if (db_doctor.patientList) {
      setAvai(true);
    }
  }, [db_doctor.patientList]);
  const [isOpen, setOpen] = useState(false);
  const [isPatient, setIsPatient] = useState({});
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
          {Object.values(db_doctor.patientList).map((patient, index) => {
            return (
              <MainContentCard
                setInfoOpen={setOpen}
                key={index}
                component={patient}
                setIsPatient={setIsPatient}
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
              Patient Details
            </div>

            {isPatient && (
              <div className="flex w-[100%] flex-row items-center justify-between rounded bg-auto-white p-2 shadow-lg shadow-gray-200 ring-2 ring-gray-200 hover:bg-white hover:ring-2 hover:ring-gray-300">
                <div>{isPatient.title}</div>
                <div>Country: {isPatient.country}</div>
                <div>City: {isPatient.city}</div>
                <div>Address: {isPatient.address}</div>
                <div>Phone number: {isPatient.phone}</div>
                <div>Email: {isPatient.user.email}</div>
                <div>First name: {isPatient.user.firstName}</div>
                <div>Last Name: {isPatient.user.lastName}</div>
                <div>Device id: {isPatient.user.assign.device.id}</div>
                <div>Facility id: {isPatient.user.assign.facility.id}</div>
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
