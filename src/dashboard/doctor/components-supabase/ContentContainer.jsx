import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PatientContent from './contents/patient/PatientContent';
import FacilityContent from './contents/facility/FacilityContent';
import NurseContent from './contents/nurse/NurseContent';
import DeviceContent from './contents/device/DeviceContent';
import Account from './Account';
import { createContext } from 'react';
import { useEffect, useState } from 'react';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { InfinitySpin } from 'react-loader-spinner';

export let telemetryTable = {};
export const handleTelemetry = (deviceId, temperature, SpO2, HrtPressure, connection) => {
  telemetryTable[`${deviceId}`] = {temperature:temperature,SpO2:SpO2,HrtPressure:HrtPressure, connected:connection}
}
// export const ContentContainerContext = createContext();
// const now = Date.now();
// const mtd = now - 3600000;

const ContentContainer = () => {
  // const [loading, setLoading] = useState(false)
  // const [devices, setDevices] = useState({});

  // const handleLoad = async () => {
  //   try {
  //     setLoading(true)
  //     let { data: DEVICE, error } = await supabase.from('DEVICE').select('*');
  //     if (error) throw error;
  //     console.log('load device success!');
  //     for (let dev of DEVICE){
  //       deviceObj[`${dev.D_Id}`] = {...dev, connected:false}

  //     }
  //     setDevices(deviceObj);
  //   } catch (error) {
  //     console.log(error.error_description || error.message);
  //   } finally {
  //     setLoading(false)
  //   }
  // };

  // useEffect(()=>{
  //   handleLoad();
  // },[])

  // if (!loading){
  return (
    // <ContentContainerContext.Provider value={{devices, setDevices, telemetries, setTelemetries}}>
    <div className="flex w-[75%] flex-auto shrink flex-col">
      <Routes>
        <Route path="/index.html" element={<PatientContent />} />
        <Route path="/facilities" element={<FacilityContent />} />
        <Route path="/nurses" element={<NurseContent />} />
        <Route path="/devices" element={<DeviceContent />} />
      </Routes>
    </div>
    // </ContentContainerContext.Provider>
  );
  // }
  //   else {
  //     return (
  //       <div className="flex items-center justify-center">
  //         <InfinitySpin width="300" color="#475569" />;
  //       </div>
  //     );
  //   }
};

export default ContentContainer;
