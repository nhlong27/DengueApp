import React, { useEffect, useState } from 'react';
import Auth from '../Auth';
import PatientInfo from './patient-content/PatientInfo';
import PatientList from './patient-content/PatientList';
import NurseProfile from './profile/NurseProfile';
import RoomInfo from './room/RoomInfo';
import { atom, useAtom } from 'jotai';
import { supabase } from '@/shared/api/supabase/supabaseClient';

export const chosenPatient = atom({});

const AppNurse = () => {
  const [loading, setLoading] = useState(true);
  const [chosen, setChosen] = useAtom(chosenPatient);

  useEffect(async () => {
    setLoading(true);
    const { data } = await supabase.from('PATIENT').select('*');
    setChosen(() => data[0]);
    setLoading(false);
  }, []);

  if (!loading) {
    return (
      <div className="h-screen w-screen bg-gray-900">
        <div className="flex h-[100%] w-[100%] flex-col items-center justify-center gap-2 lg:flex-row lg:gap-4">
          <div className="mx-auto mt-auto flex h-[70%] w-[90%] items-center justify-center gap-4 rounded-2xl bg-gray-300 p-2 shadow-sm shadow-gray-100 lg:my-auto lg:ml-auto lg:mr-0 lg:h-[95%] lg:w-[40%] lg:flex-col lg:p-4">
            <NurseProfile />
            <RoomInfo />
          </div>
          <div className="mx-auto mb-auto flex h-[70%] w-[90%] gap-4 rounded-2xl bg-gray-300 p-2 shadow-sm shadow-gray-100 lg:my-auto lg:mr-auto lg:ml-0 lg:h-[95%] lg:w-[55%] lg:flex-col lg:p-4">
            <PatientInfo />
            <PatientList />
          </div>
        </div>
      </div>
    );
  }
};

export default AppNurse;
