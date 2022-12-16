import React, { useState, useEffect } from 'react';
import MainContentCard from './MainContentCard';
import { InfinitySpin } from 'react-loader-spinner';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { StatisticsCard } from './MainContentCard2';
import { facilityList } from '@/dashboard/doctor/App';
import { useAtom } from 'jotai';

const MainContent = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [isRoom, setIsRoom] = useState({});
  const [content] = useAtom(facilityList);


  let style1 = '';
  let style2 = '';
  if (isOpen) {
    style1 = '';
    style2 = 'w-[40%]';
  } else {
    style1 = '-mr-[32rem] opacity-0';
    style2 = 'w-[100%]';
  }
  // if (!loading) {
  return (
    <>
      <div
        className={`flex min-h-[100%] flex-col items-center justify-start gap-4 rounded-lg bg-gray-300 p-2 transition-all duration-700`}
      >
        {Object.values(content).map((room, index) => {
          return (
            <div
              className="w-[100%] overflow-hidden rounded-2xl ring-2 ring-black"
              key={index}
            >
              <StatisticsCard component={room} setIsRoom={setIsRoom} setIsUpdate={props.setIsUpdate} />
            </div>
          );
        })}
      </div>
    </>
  );
  // } else {
  //   return (
  //     <div className="flex items-center justify-center">
  //       <InfinitySpin width="300" color="#475569" />;
  //     </div>
  //   );
  // }
};

export default MainContent;
