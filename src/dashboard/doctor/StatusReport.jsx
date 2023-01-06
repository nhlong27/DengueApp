import React, { useEffect, useState } from 'react';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { RiNurseFill } from 'react-icons/ri';
import { useAtom } from 'jotai';
import { allPatients, nurseList, facilityList, deviceList, patientList } from './App';
import { Link } from 'react-router-dom';

const StatusReport = () => {
  const [patients] = useAtom(allPatients);
  const [nurses] = useAtom(nurseList);
  const [facilities] = useAtom(facilityList);
  const [patient, setPatient] = useAtom(patientList);
  const [devices] = useAtom(deviceList);
  console.log(Object.values(facilities).map((room) => room.beds));
  const handleLoadPatient = (type) => {
    setPatient(patients[`${type}`]);
  };
  console.log(Object.keys(facilities));
  return (
    <div className="m-4 flex h-[95%] w-[95%] flex-col items-center justify-start gap-2 rounded-2xl p-4 shadow-lg ring-2 ring-black">
      <div className="flex w-[100%] items-center justify-center text-[20px] font-extrabold tracking-[5px] text-gray-500">
        STATUS
      </div>
      <div className="flex min-h-[10rem] w-[100%] flex-col items-center justify-start gap-4">
        <div className="w-[100%] border-b-2 border-gray-500 text-large font-bold tracking-wider text-black">
          Patients{' '}
          <span className="text-[14px] font-bold tracking-normal text-black ">
            There are currently
          </span>
        </div>
        {patients.all && (
          <>
            <Link
              to="/dashboard/"
              onClick={() => handleLoadPatient('critical')}
              className="flex w-[80%] items-center justify-between rounded-2xl bg-red-500 py-2 px-4 text-white ring-2 ring-black ring-offset-2 ring-offset-white hover:bg-red-600"
            >
              <span className="text-[25px] font-extrabold tracking-wide">
                {patients.critical.length}
              </span>{' '}
              in Critical conditions
            </Link>
            <Link
              to="/dashboard/"
              onClick={() => handleLoadPatient('febrile')}
              className="flex w-[80%] items-center justify-between rounded-2xl bg-orange-500 py-2 px-4 text-white ring-2 ring-black ring-offset-2 ring-offset-white hover:bg-orange-600"
            >
              <span className="text-[25px] font-extrabold tracking-wide">
                {patients.febrile.length}
              </span>{' '}
              in Febrile conditions
            </Link>
            <Link
              to="/dashboard/"
              onClick={() => handleLoadPatient('recovery')}
              className="flex w-[80%] items-center justify-between rounded-2xl bg-green-500 py-2 px-4 text-white ring-2 ring-black ring-offset-2 ring-offset-white hover:bg-green-600"
            >
              <span className="text-[25px] font-extrabold tracking-wide">
                {patients.recovery.length}
              </span>{' '}
              in Recovery conditions
            </Link>
            <Link
              to="/dashboard/"
              onClick={() => handleLoadPatient('all')}
              className="flex w-[80%] items-center justify-between rounded-2xl bg-gray-500 py-2 px-4 text-white ring-2 ring-black ring-offset-2 ring-offset-white hover:bg-gray-600"
            >
              <span className="text-[25px] font-extrabold tracking-wide">
                {patients.all.length}
              </span>{' '}
              in Total
            </Link>
          </>
        )}
      </div>
      <div className="mt-4 flex w-[100%] flex-col items-center justify-start gap-2">
        <div className="w-[100%] border-gray-500 text-large font-bold tracking-wider text-black">
          Nurses{' '}
          <span className="text-[14px] font-bold tracking-normal text-black ">
            There are currently
          </span>
        </div>
        <Link
          to="/dashboard/nurses"
          className="flex w-[80%] items-center justify-between rounded-2xl bg-white py-2 px-4 text-black ring-2 ring-black ring-offset-2 ring-offset-white hover:bg-gray-300"
        >
          <span className="text-[25px] font-extrabold tracking-wide">
            {nurses.length}
          </span>{' '}
          in Total
        </Link>
      </div>
      <div className="flex w-[100%] flex-col items-center justify-start gap-2">
        <div className="w-[100%] border-gray-500 text-large font-bold tracking-wider text-black">
          Facilities{' '}
          <span className="text-[14px] font-bold tracking-normal text-black ">
            There are currently
          </span>
        </div>
        {Object.keys(facilities).length !== 0 ? (
          <Link
            to="/dashboard/facilities"
            className="flex w-[80%]  items-center justify-between rounded-2xl bg-white py-2 px-4 text-black ring-2 ring-black ring-offset-2 ring-offset-white hover:bg-gray-300"
          >
            <span className="text-[25px] font-extrabold tracking-wide">
              {Object.keys(facilities).length}
            </span>{' '}
            Rooms
            <span className="text-[25px] font-extrabold tracking-wide">
              {
                Object.values(facilities)
                  .map((room) => room.beds)
                  .reduce((acc, curr) => acc.concat(curr)).length
              }{' '}
            </span>{' '}
            Beds
          </Link>
        ) : null}
      </div>
      <div className="flex w-[100%] flex-col items-center justify-start gap-2">
        <div className="w-[100%] border-gray-500 text-large font-bold  tracking-wider text-black">
          Devices{' '}
          <span className="text-[14px] font-bold tracking-normal text-black ">
            There are currently
          </span>
        </div>
        <Link
          to="/dashboard/devices"
          className="flex w-[80%]  items-center justify-between rounded-2xl bg-white py-2 px-4 text-black ring-2 ring-black ring-offset-2 ring-offset-white hover:bg-gray-300"
        >
          <span className="text-[25px] font-extrabold tracking-wide">
            {devices.length}
          </span>{' '}
          in Total
        </Link>
      </div>
    </div>
  );
};

export default StatusReport;
