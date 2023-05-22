import React, { useEffect, useState } from 'react';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { useAtom } from 'jotai';
import { userSession } from '@/dashboard/Auth';
import { chosenPatient } from '../AppNurse';
import DeviceData from './DeviceData';
const PatientInfo = () => {
  const [session] = useAtom(userSession);
  const [chosen] = useAtom(chosenPatient);
  const [devices, setDevices] = useState(null);
  
  const loadDeviceList = async () => {
    try {
      const { data: DEVICE, error } = await supabase.from('DEVICE').select('*');
      let deviceList = {};
      for (let n of DEVICE) {
        deviceList[`${n.D_Id}`] = { ...n };
      }
      setDevices(() => deviceList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadDeviceList();
  }, []);
  return (
    <div className="h-[100%] w-[100%] rounded-lg bg-auto-white px-4 py-2 ring-2 ring-black lg:h-[30%]">
      <div className="h-[20] w-[100%]">
        Status: {chosen.Status}
        First name: {chosen.Fname}
        Last name: {chosen.Lname}
        Device code: {chosen.D_Id}
        Bed code: {chosen.B_Number}
      </div>
      <DeviceData device={devices[`${chosen.D_Id}`]} />
    </div>
  );
};

export default PatientInfo;
