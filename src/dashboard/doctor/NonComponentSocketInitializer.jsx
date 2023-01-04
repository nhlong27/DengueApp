import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Chatbox from './Chatbox';
import ContentContainer from './ContentContainer';
import { client } from '@/shared/api/initClient_tenant';
import { LineChart } from './components-supabase/contents/patient/SingleLineChart';
import { AiOutlineDown } from 'react-icons/ai';
import { Provider, atom, useAtom } from 'jotai';
import { userSession } from '../Auth';
import { InfinitySpin } from 'react-loader-spinner';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { telemetries } from './App';

const now = new Date().toISOString().toLocaleString('zh-TW');
const mtd = now - 3600000;

const NonComponentSocketInitializer = () => {
  const [tele, setTelemetries] = useAtom(telemetries);
  const [loading, setLoading] = useState(false);

  const handleSocket = async () => {
    try {
      setLoading(true);
      let { data: DEVICE, error } = await supabase.from('DEVICE').select('*');
      if (error) throw error;

      let token = await client.connect();
      const obj = {};
      for (let device of DEVICE) {
        obj[`${device.D_Id}`] = atom({ temperature: 0, HrtPressure: 0, SpO2: 0 });
        openSocket(device.D_Id);
      }

      setTelemetries((prev) => ({ ...prev, ...obj }));
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
      if (Object.keys(response.data).length !== 0) {
        console.log('response - streaming');
        await supabase
          .from('DEVICE')
          .update({ Status: 'Streaming' })
          .eq('D_Id', deviceId);

        if (response.data.temperature[0][1] < 37) {
          timeElapse = status !== 'recovery' ? timeElapse + 4 : 0;
          if (timeElapse >= 10) {
            status = 'recovery';

            const { error } = await supabase
              .from('PATIENT')
              .update({ Status: status })
              .eq('D_Id', deviceId);
            if (error) throw error;
          }
          const { error } = await supabase.from('TELEMETRY').insert([
            {
              D_Id: deviceId,
              created_at: new Date().toISOString().toLocaleString('zh-TW'),
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
          response.data.temperature[0][1] <= 38.5
        ) {
          timeElapse = status !== 'critical' ? timeElapse + 4 : 0;
          if (timeElapse >= 10) {
            status = 'critical';

            const { error } = await supabase
              .from('PATIENT')
              .update({ Status: status })
              .eq('D_Id', deviceId);
            if (error) throw error;
          }
          const { error } = await supabase.from('TELEMETRY').insert([
            {
              D_Id: deviceId,
              created_at: new Date().toISOString().toLocaleString('zh-TW'),
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
          response.data.temperature[0][1] <= 41
        ) {
          timeElapse = status !== 'febrile' ? timeElapse + 4 : 0;
          if (timeElapse >= 10) {
            status = 'febrile';
            const { error } = await supabase
              .from('PATIENT')
              .update({ Status: status })
              .eq('D_Id', deviceId);
            if (error) throw error;
          }
          const { error } = await supabase.from('TELEMETRY').insert([
            {
              D_Id: deviceId,
              created_at: new Date().toISOString().toLocaleString('zh-TW'),
              Temperature: response.data.temperature[0][1],
              SpO2: response.data.SpO2[0][1],
              Pressure: response.data.HrtPressure[0][1],
              Elapse: timeElapse,
              Status: status,
            },
          ]);
          if (error) throw error;
        }
        //  else if (
        //   response.data.temperature[0][1] >= 37 &&
        //   response.data.temperature[0][1] <= 37
        // ) {
        //   timeElapse = status !== 'Recovery' ? timeElapse + 4 : 0;
        //   if (timeElapse >= 10) {
        //     status = 'Recovery';
        //     const { error } = await supabase
        //       .from('PATIENT')
        //       .update({ Status: status })
        //       .eq('D_Id', deviceId);
        //     if (error) throw error;
        //   }
        //   const { error } = await supabase.from('TELEMETRY').insert([
        //     {
        //       D_Id: deviceId,
        //       created_at:((new Date()).toISOString()).toLocaleString('zh-TW'),
        //       Temperature: response.data.temperature[0][1],
        //       SpO2: response.data.SpO2[0][1],
        //       Pressure: response.data.HrtPressure[0][1],
        //       Elapse: timeElapse,
        //       Status: status,
        //     },
        //   ]);
        //   if (error) throw error;
        // }
        const telePayload = atom({
          temperature: response.data.temperature[0][1],
          SpO2: response.data.SpO2[0][1],
          HrtPressure: response.data.HrtPressure[0][1],
        });
        setTimeout(async () => {
          await supabase.from('DEVICE').update({ Status: 'Paused' }).eq('D_Id', deviceId);
        }, 20000);

        setTelemetries((prev) => ({ ...prev, [deviceId]: telePayload }));
      }
    });
  };

  useEffect(async () => {
    console.log('opening sockets..');
    await handleSocket();
  }, []);
  return <></>;
};

export default NonComponentSocketInitializer;
