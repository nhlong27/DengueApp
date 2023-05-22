import React, { useState, useEffect } from 'react';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { useAtom } from 'jotai';
import { userSession } from '@/dashboard/Auth';
const DeviceData = (props) => {
  const [telemetries, setTelemetries] = useState({
    temperature: 0,
    SpO2: 0,
    HrtPressure: 0,
  });

  const subscribeToTelemetry = () => {
    const MESSAGE = supabase
      .channel('custom-inset-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'MESSAGE' },
        (payload) => {
          if (payload.new.D_Id === props.device.D_Id) {
            console.log('Change received!', payload);
            telemetries.temperature = payload.new.Temperature;
            telemetries.SpO2 = payload.new.SpO2;
            telemetries.HrtPressure = payload.new.Pressure;
          }
        },
      )
      .subscribe();
  };
  useEffect(() => {
    subscribeToTelemetry();
  }, []);
  return (
    <div className="flex h-[80%] w-[100%] items-center justify-start">
      <div className="flex w-[30%] flex-col items-start justify-start">
        <div className="relative px-4 text-[22px] font-semibold tracking-widest text-black">
          <GrDevice />
          {props.device.Label}
          {status && status[`${props.device.D_Id}`] === 'Streaming' ? (
            <div className="absolute -bottom-8 left-[9rem] rounded-lg px-2 text-[14px] text-green-500 ring-2 ring-green-400">
              STREAMING
            </div>
          ) : (
            <div className="absolute -bottom-8 left-[9rem] rounded-lg px-2 text-[14px] text-red-500 ring-2 ring-red-400">
              PAUSED
            </div>
          )}
        </div>
        <div className="px-4 text-[16px] font-semibold text-blue-600">
          {props.device.Type}
        </div>
        {props.device.Assign === 'No' ? (
          <div className="px-4 text-[14px] font-bold text-red-500">Assigned: None</div>
        ) : (
          <div className="px-4 text-[14px] font-bold text-green-500">
            Assigned: {props.device.Assign}
          </div>
        )}
      </div>
      <div className="ml-auto flex h-[100%] w-[100%] items-center justify-center gap-[5rem]">
        <div className="flex h-[100%] w-[20%] flex-col items-center  justify-between rounded-2xl p-2 text-orange-400 ring-2 ring-orange-400">
          <div className="">
            <TbTemperatureCelsius size={40} />
          </div>
          <div className="text-[40px] font-extrabold tracking-[5px] text-orange-400">
            {telemetries.temperature}
          </div>
        </div>
        <div className="flex h-[100%] w-[20%] flex-col items-center justify-between rounded-2xl p-2 text-blue-400 ring-2 ring-blue-400">
          <div className="">
            <GiMedicalDrip size={40} />
          </div>
          <div className="text-[40px] font-extrabold tracking-[5px] text-blue-400">
            {telemetries.SpO2}
          </div>
        </div>
        <div className="flex h-[100%] w-[20%] flex-col items-center justify-between rounded-2xl p-2 text-purple-400 ring-2 ring-purple-400">
          <div className="">
            <BiHeart size={40} />
          </div>
          <div className="text-[40px] font-extrabold tracking-[5px] text-purple-400">
            {telemetries.HrtPressure}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceData;
