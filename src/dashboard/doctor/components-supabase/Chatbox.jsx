import React, { useEffect, useState } from 'react';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { RiNurseFill } from 'react-icons/ri';

const Chatbox = () => {
  const [nurses, setNurses] = useState([]);
  const loadNurse = async () => {
    const { data: NURSE, error } = await supabase.from('NURSE').select('*');
    console.log(NURSE);
    setNurses(NURSE);
  };
  useEffect(() => {
    loadNurse();
  }, []);
  return (
    <>
      <div className="scrollbar m-4 flex h-[40%] w-[80%] flex-col items-center justify-start overflow-y-scroll rounded-lg bg-black py-2 ring-2 ring-black">
        {nurses &&
          nurses.map((nurse, index) => {
            return (
              <div
                key={index}
                className="transition-full mb-2 flex w-[87%] items-center justify-center gap-2 rounded bg-auto-white p-4 text-center duration-300 hover:w-[90%]"
              >
                <RiNurseFill />
                Nurse: {nurse.Fname}
                <span className=" text-green-300">Available</span>
              </div>
            );
          })}
      </div>
      <div className="mt-4 h-[40%] w-[80%] overflow-y-scroll rounded-lg bg-gray-300 p-4 scrollbar ring-2 ring-black">
        <div className="ml-8 mb-4 rounded-lg bg-auto-white p-2 text-black">
          Check patient Duc at room 201
        </div>
        <div className="mr-8 mb-4 rounded-lg bg-auto-white p-2 text-black">
          Ok. Could I know which bed is he assigned to?
        </div>
        <div className="ml-8 mb-4 rounded-lg bg-auto-white p-2 text-black">
          Bed number 15
        </div>
      </div>
      <div className="mt-2 mb-4 w-[80%] rounded-lg bg-black p-4 text-white">
        Say something...
      </div>
    </>
  );
};

export default Chatbox;
