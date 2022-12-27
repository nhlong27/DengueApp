import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PatientContent from './components-supabase/contents/patient/PatientContent';
import FacilityContent from './components-supabase/contents/facility/FacilityContent';
import NurseContent from './components-supabase/contents/nurse/NurseContent';
import DeviceContent from './components-supabase/contents/device/DeviceContent';
import Account from './components-supabase/profile/Account';
import { useEffect, useState } from 'react';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { InfinitySpin } from 'react-loader-spinner';
import { client } from '@/shared/api/initClient_tenant';
import { useAtom, atom } from 'jotai';
import { telemetries, deviceList, facilityList, nurseList, patientList } from './App';
import Schedules from './components-supabase/contents/schedule/Schedules';
import Messages from './components-supabase/contents/message/Messages';
import { userSession } from '../Auth';

let loadFacility = {};

const ContentContainer = (props) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [isSocket, setIsSocket] = useState(false); // I forgot what this is for
  const [facilities, setFacilities] = useAtom(facilityList);
  const [devices, setDevices] = useAtom(deviceList);
  const [nurses, setNurses] = useAtom(nurseList);
  const [patients, setPatients] = useAtom(patientList);

  const [session] = useAtom(userSession);

  const handleLoadDevice = async () => {
    try {
      // setLoading(true);
      let { data: DEVICE, error } = await supabase
        .from('DEVICE')
        .select('*')
        .eq('D_Ssn', session.user.id);

      console.log('load devices success!');
      await setDevices(() => DEVICE);
    } catch (error) {
      console.log(error.error_description || error.message);
    }
    //  finally {
    //   setLoading(false);
    // }
  };

  const handleLoadFacility = async () => {
    try {
      loadFacility = {};
      let { data: ROOM, error } = await supabase
        .from('ROOM')
        .select('*')
        .eq('D_Ssn', session.user.id);
      if (error) throw error;
      for (let room of ROOM) {
        loadFacility[`${room.R_Number}`] = { ...room, beds: [], nurses: [] };
        let { data: BED, error } = await supabase
          .from('BED')
          .select('*')
          .eq('R_Number', room.R_Number);
        for (let bed of BED) {
          loadFacility[`${room.R_Number}`].beds.push(bed);
        }
        let { data: NURSEID } = await supabase
          .from('IS_ASSIGNED_TO')
          .select('*')
          .eq('R_Number', room.R_Number);
        for (let id of NURSEID) {
          let { data: NURSE } = await supabase
            .from('NURSE')
            .select('*')
            .eq('N_Ssn', id.N_Ssn);
          loadFacility[`${room.R_Number}`].nurses.push(NURSE[0]);
        }
      }

      console.log('load facilties success!');
      setFacilities(loadFacility);
    } catch (error) {
      console.log(error.error_description || error.message);
    }
    //  finally {
    //   setLoading(false);
    // }
  };

  const handleLoadNurse = async () => {
    try {
      // setLoading(true);
      let { data: NURSE, error } = await supabase
        .from('NURSE')
        .select('*')
        .eq('D_Ssn', session.user.id);
      if (error) throw error;
      console.log('load nurses success!');
      setNurses(NURSE);
    } catch (error) {
      console.log(error.error_description || error.message);
    } 
    // finally {
    //   setLoading(false);
    // }
  };

  const handleLoadPatient = async (type = 'all') => {
    try {
      // setLoading(true);
      let { data: PATIENT, error } = await supabase
        .from('PATIENT')
        .select('*')
        .eq('D_Ssn', session.user.id);
      if (error) throw error;
      let patients = {};
      patients.emergency = PATIENT.filter((patient) => patient.Status === 'Emergency');
      patients.all = [...patients.emergency];
      patients.febrile = PATIENT.filter((patient) => patient.Status === 'Febrile');
      patients.all = patients.all.concat(patients.febrile);
      patients.incubation = PATIENT.filter((patient) => patient.Status === 'Incubation');
      patients.all = patients.all.concat(patients.incubation);

      patients.recovery = PATIENT.filter((patient) => patient.Status === 'Recovery');
      patients.all = patients.all.concat(patients.recovery);

      patients.normal = PATIENT.filter((patient) => patient.Status === 'Normal');
      patients.all = patients.all.concat(patients.normal);

      patients.none = PATIENT.filter((patient) => patient.Status === 'None');
      patients.all = patients.all.concat(patients.none);

      console.log('load patients success!');
      setPatients(patients[`${type}`]);
    } catch (error) {
      console.log(error.error_description || error.message);
    } 
    // finally {
    //   setLoading(false);
    // }
  };

  useEffect(async () => {
    setLoading(true)
    console.log('loading devices..');
    await handleLoadDevice();
    console.log('loading facilities..');
    await handleLoadFacility();
    console.log('loading nurses..');
    await handleLoadNurse();
    console.log('loading patients..');
    await handleLoadPatient();
    setLoading(false)
  }, [isUpdate, refresh]);

  if (!loading) {
    return (
      // <ContentContainerContext.Provider value={{ telemetries, setTelemetries }}>
      <div className="flex w-[75%] flex-auto flex-col">
        <Routes>
          <Route
            path="/"
            element={
              <PatientContent
                setRefresh={setRefresh}
                setIsChart={props.setIsChart}
                handleLoadPatient={handleLoadPatient}
              />
            }
          />
          <Route path="/account" element={<Account />} />
          <Route
            path="/facilities"
            element={
              <FacilityContent
                handleLoadFacility={handleLoadFacility}
                setRefresh={setRefresh}
                setIsUpdate={setIsUpdate}
              />
            }
          />
          <Route
            path="/nurses"
            element={
              <NurseContent setRefresh={setRefresh} handleLoadNurse={handleLoadNurse} />
            }
          />
          <Route
            path="/devices"
            element={
              <DeviceContent
                handleLoadDevice={handleLoadDevice}
                setRefresh={setRefresh}
                setIsUpdate={setIsUpdate}
              />
            }
          />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </div>

      // </ContentContainerContext.Provider>
    );
  } else {
    return (
      <div className="flex w-[75%] items-center justify-center">
        <InfinitySpin width="300" color="#475569" />;
      </div>
    );
  }
};

export default ContentContainer;
