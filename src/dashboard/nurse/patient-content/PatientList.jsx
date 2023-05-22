import React, { useEffect, useState } from 'react';
import { PatientDashboard } from './PatientDashboard';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { useAtom } from 'jotai';
import { userSession } from '@/dashboard/Auth';
import { chosenPatient } from '../AppNurse';
const PatientList = () => {
  const [chosen] = useAtom(chosenPatient);
  const [session] = useAtom(userSession);
  const [statusOverview, setStatusOverview] = useState(null);
  const [patients, setPatients] = useState(null);

  const loadAndFilterPatientList = async (type = 'all') => {
    try {
      let { data: NURSE } = await supabase
        .from('NURSE')
        .select('*')
        .eq('N_Ssn', session.user.id)
        .single();
      let { data: PATIENT, error } = await supabase
        .from('PATIENT')
        .select('*')
        .eq('D_Ssn', NURSE.D_Ssn);

      if (error) throw error;
      let patients = {};
      patients.critical = PATIENT.filter((patient) => patient.Status === 'Critical');
      patients.all = [...patients.critical];
      patients.febrile = PATIENT.filter((patient) => patient.Status === 'Febrile');
      patients.all = patients.all.concat(patients.febrile);
      patients.recovery = PATIENT.filter((patient) => patient.Status === 'Recovery');
      patients.all = patients.all.concat(patients.recovery);

      patients.none = PATIENT.filter((patient) => patient.Status === 'None');
      patients.all = patients.all.concat(patients.none);
      console.log('load patients success!');
      setPatients(patients[`${type}`]);
    } catch (error) {
      console.log(error.error_description || error.message);
    }
  };
  useEffect(async () => {
    await loadAndFilterPatientList();
    await chosenPatient(() => patients.all[0]);
  }, []);
  return (
    <div className="h-[100%] w-[100%] rounded-lg bg-auto-white lg:h-[70%]">
      <PatientDashboard
        loadAndFilterPatientList={loadAndFilterPatientList}
        rows={patients}
      />
      <div
        className={`transition-full absolute left-0 -top-[1rem] flex w-[100%] flex-row items-center justify-start duration-700`}
      >
        <div className="mr-[1rem] mb-4 rounded-lg font-extrabold tracking-wider text-black">
          Sort by
        </div>
        <button
          onClick={() => loadAndFilterPatientList('all')}
          className="height-[1rem] mr-[1rem] rounded-lg bg-gray-400 p-2 text-white ring-2 ring-black ring-offset-1 ring-offset-white hover:bg-gray-500"
        >
          All
        </button>
        <button
          onClick={() => loadAndFilterPatientList('critical')}
          className="height-[1rem] mr-[1rem] rounded-lg bg-red-400 p-2 text-white ring-2 ring-black ring-offset-1 ring-offset-white hover:bg-red-500"
        >
          Critical
        </button>
        <button
          onClick={() => loadAndFilterPatientList('febrile')}
          className="height-[1rem] mr-[1rem] rounded-lg bg-orange-400 p-2 text-white ring-2 ring-black ring-offset-1 ring-offset-white hover:bg-orange-500"
        >
          Febrile
        </button>
        <button
          onClick={() => loadAndFilterPatientList('recovery')}
          className="height-[1rem] mr-[1rem] rounded-lg bg-green-400 p-2 text-white ring-2 ring-black ring-offset-1 ring-offset-white hover:bg-green-500"
        >
          Recovery
        </button>
        <button
          onClick={() => loadAndFilterPatientList('none')}
          className="height-[1rem] mr-[1rem] rounded-lg bg-blue-400 p-2 text-white ring-2 ring-black ring-offset-1 ring-offset-white hover:bg-blue-500"
        >
          Unknown
        </button>
      </div>
    </div>
  );
};

export default PatientList;
