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
import { client } from '@/shared/api/initClient_tenant';

export let telemetryTable = {};
export const handleTelemetry = (deviceId, temperature, SpO2, HrtPressure, connection) => {
  telemetryTable[`${deviceId}`] = {
    temperature: temperature,
    SpO2: SpO2,
    HrtPressure: HrtPressure,
    connected: connection,
  };
};
export const ContentContainerContext = createContext();
const now = Date.now();
const mtd = now - 3600000;

const ContentContainer = () => {
  const [loading, setLoading] = useState(false);
  const [devices, setDevices] = useState([]);
  const [telemetries, setTelemetries] = useState({});

  const handleLoad = async () => {
    try {
      setLoading(true);
      let { data: DEVICE, error } = await supabase.from('DEVICE').select('*');
      if (error) throw error;
      console.log('load device success!');
      let token = await client.connect();
      for (let device of DEVICE) {
        openSocket(device.D_Id);
      }
      setDevices(DEVICE);
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const openSocket = async (deviceId) => {
    let params = {
      cmdId: 10,
      entityId: deviceId,
      startTs: mtd,
      endTs: now,
      // close: close
    };
    // if (token) {
    client.subscribe(params, async function (response) {
      if (response && response.data) {
        setTelemetries({
          ...telemetries,
          [deviceId]: {
            temperature: response.data.temperature[0][1],
            SpO2: response.data.SpO2[0][1],
            HrtPressure: response.data.HrtPressure[0][1],
            connected: true,
          },
        });
      }
    });
    // } else {
    //   setTimeout(() => openSocket(), 3000);
    // }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  if (!loading) {
    return (
      <ContentContainerContext.Provider
        value={{ devices, setDevices, telemetries, setTelemetries }}
      >
        <div className="flex w-[75%] flex-auto shrink flex-col">
          <Routes>
            <Route path="/index.html" element={<PatientContent />} />
            <Route path="/facilities" element={<FacilityContent />} />
            <Route path="/nurses" element={<NurseContent />} />
            <Route path="/devices" element={<DeviceContent />} />
          </Routes>
        </div>
      </ContentContainerContext.Provider>
    );
  } else {
    return (
      <div className="flex items-center justify-center">
        <InfinitySpin width="300" color="#475569" />;
      </div>
    );
  }
};

export default ContentContainer;
