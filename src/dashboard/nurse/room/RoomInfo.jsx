import { userSession } from '@/dashboard/Auth';
import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import MessageBox from './MessageBox';

const RoomInfo = () => {
  const [roomInfo, setRoomInfo] = useState({});
  const [session] = useAtom(userSession);
  const loadRoomInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('IS_ASSIGNED_TO')
        .select('*')
        .eq('N_Ssn', session.user.id)
        .single();
      const { data: BED } = await supabase
        .from('BED')
        .select('*')
        .eq('R_Number', data.R_Number);
      const { data: NURSE } = await supabase
        .from('NURSE')
        .select('*')
        .eq('R_Number', data.R_Number);
      setRoomInfo((state) => ({
        ...state,
        R_Number: data.R_Number,
        nurses: NURSE,
        beds: BED,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadRoomInfo();
  }, []);
  return (
    <div className="flex h-[100%] w-[100%] flex-col  gap-4  rounded-lg bg-auto-white p-2 py-4 ring-2 ring-black lg:h-[70%]">
      <div className="flex w-[100%] basis-[10%] py-2 px-4 shadow-lg">
        <h1 className="text-large font-bold tracking-wider text-blue-500">Room Info</h1>
        <div>
          Beds:{' '}
          <div className="ml-4 font-bold tracking-wider text-blue-500">
            {roomInfo.beds}
          </div>
          Nurses:{' '}
          <div className="ml-4 font-bold tracking-wider text-blue-500">
            {roomInfo.nurses}
          </div>
        </div>
      </div>
      <MessageBox R_Number={roomInfo.R_Number} />
    </div>
  );
};

export default RoomInfo;
