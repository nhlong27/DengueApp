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
import { useAtom, atom } from 'jotai';
import { telemetries, deviceList } from '../App';

// export let telemetryTable = {};
// export const handleTelemetry = (deviceId, temperature, SpO2, HrtPressure, connection) => {
//   telemetryTable[`${deviceId}`] = {
//     temperature: temperature,
//     SpO2: SpO2,
//     HrtPressure: HrtPressure,
//     connected: connection,
//   };
// };

// export const ContentContainerContext = createContext();
const now = Date.now();
const mtd = now - 3600000;

const ContentContainer = (props) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [devices, setDevices] = useAtom(deviceList);
  const [tele, setTelemetries] = useAtom(telemetries);
  const [isSocket, setIsSocket] = useState(false);

  const listenUpdate = async () => {
    const DEVICE = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'DEVICE' },
        (payload) => {
          console.log('Device Change received!', payload);
          setIsUpdate((state) => !state);
        },
      )
      .subscribe();
  };

  const handleLoad = async () => {
    try {
      setLoading(true);
      let { data: DEVICE, error } = await supabase.from('DEVICE').select('*');
      if (error) throw error;
      console.log('load device success!');
      console.log('DEVICE');
      console.log(DEVICE);
      setDevices(DEVICE);
      // let token = await client.connect();
      // for (let device of DEVICE) {
      //   openSocket(device.D_Id);
      // }
    } catch (error) {
      console.log(error.error_description || error.message);
    }
    // finally {
    //   setLoading(false);
    // }
  };

  const handleSocket = async () => {
    try {
      console.log('handleSocket');
      let { data: DEVICE, error } = await supabase.from('DEVICE').select('*');
      if (error) throw error;

      let token = await client.connect();
      const obj = {};
      for (let device of DEVICE) {
        obj[`${device.D_Id}`] = atom({ temperature: 0, HrtPressure: 0, SpO2: 0 });
        openSocket(device.D_Id);
      }

      console.log('setTelemetries');
      console.log(obj);
      setTelemetries(obj);
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const openSocket = async (deviceId) => {
    console.log('socket opened!');
    let params = {
      cmdId: 10,
      entityId: deviceId,
      startTs: mtd,
      endTs: now,
      // close: close
    };
    let timeElapse = 0;
    let status = 'none';
    client.subscribe(params, async function (response) {
      if (response.data) {
        if (response.data.temperature[0][1] < 37) {
          timeElapse = status !== 'Normal' ? timeElapse + 4 : 0;
          if (timeElapse >= 10) {
            status = 'Normal';

            const { error } = await supabase
              .from('PATIENT')
              .update({ Status: status })
              .eq('D_Id', deviceId);
            if (error) throw error;
          }
          const { error } = await supabase.from('TELEMETRY').insert([
            {
              D_Id: deviceId,
              Time: Date.now(),
              Temperature: response.data.temperature[0][1],
              SpO2: response.data.SpO2[0][1],
              Pressure: response.data.HrtPressure[0][1],
              Elapse: timeElapse,
              Status: status,
            },
          ]);
          if (error) throw error;
        } else if (
          response.data.temperature[0][1] >= 37.5 &&
          response.data.temperature[0][1] <= 38.5
        ) {
          timeElapse = status !== 'Incubation' ? timeElapse + 4 : 0;
          if (timeElapse >= 10) {
            status = 'Incubation';

            const { error } = await supabase
              .from('PATIENT')
              .update({ Status: status })
              .eq('D_Id', deviceId);
            if (error) throw error;
          }
          const { error } = await supabase.from('TELEMETRY').insert([
            {
              D_Id: deviceId,
              Time: Date.now(),
              Temperature: response.data.temperature[0][1],
              SpO2: response.data.SpO2[0][1],
              Pressure: response.data.HrtPressure[0][1],
              Elapse: timeElapse,
              Status: status,
            },
          ]);
          if (error) throw error;
        } else if (
          response.data.temperature[0][1] >= 39 &&
          response.data.temperature[0][1] <= 40
        ) {
          timeElapse = status !== 'Febrile' ? timeElapse + 4 : 0;
          if (timeElapse >= 10) {
            status = 'Febrile';
            const { error } = await supabase
              .from('PATIENT')
              .update({ Status: status })
              .eq('D_Id', deviceId);
            if (error) throw error;
          }
          const { error } = await supabase.from('TELEMETRY').insert([
            {
              D_Id: deviceId,
              Time: Date.now(),
              Temperature: response.data.temperature[0][1],
              SpO2: response.data.SpO2[0][1],
              Pressure: response.data.HrtPressure[0][1],
              Elapse: timeElapse,
              Status: status,
            },
          ]);
          if (error) throw error;
        } else if (
          response.data.temperature[0][1] >= 37 &&
          response.data.temperature[0][1] <= 37.5
        ) {
          timeElapse = status !== 'Recovery' ? timeElapse + 4 : 0;
          if (timeElapse >= 10) {
            status = 'Recovery';
            const { error } = await supabase
              .from('PATIENT')
              .update({ Status: status })
              .eq('D_Id', deviceId);
            if (error) throw error;
          }
          const { error } = await supabase.from('TELEMETRY').insert([
            {
              D_Id: deviceId,
              Time: Date.now(),
              Temperature: response.data.temperature[0][1],
              SpO2: response.data.SpO2[0][1],
              Pressure: response.data.HrtPressure[0][1],
              Elapse: timeElapse,
              Status: status,
            },
          ]);
          if (error) throw error;
        }
        const telePayload = atom({
          temperature: response.data.temperature[0][1],
          SpO2: response.data.SpO2[0][1],
          HrtPressure: response.data.HrtPressure[0][1],
        });
        setTelemetries((prev) => ({ ...prev, [deviceId]: telePayload }));
      }
    });
  };

  useEffect(async () => {
    await handleLoad();
    await handleSocket();
    listenUpdate();
  }, [refresh, isUpdate]);

  if (!loading) {
    return (
      // <ContentContainerContext.Provider value={{ telemetries, setTelemetries }}>
      <div className="flex w-[75%] flex-auto flex-col">
        <Routes>
          <Route
            path="/index.html"
            element={<PatientContent setIsChart={props.setIsChart} />}
          />
          <Route path="/account" element={<Account session={props.session} />} />
          <Route path="/facilities" element={<FacilityContent />} />
          <Route path="/nurses" element={<NurseContent />} />
          <Route
            path="/devices"
            element={<DeviceContent refresh={refresh} setRefresh={setRefresh} />}
          />
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
