import React, { useState, useEffect } from 'react';
import MainContentCard from './MainContentCard';
import { InfinitySpin } from 'react-loader-spinner';
import { supabase } from '@/shared/api/supabase/supabaseClient';

const MainContent = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [isNurse, setIsNurse] = useState({});
  const handleLoad = async () => {
    try {
      setLoading(true);
      let { data: NURSE, error } = await supabase.from('NURSE').select('*');
      if (error) throw error;
      console.log('load nurses success!');
      setContent(NURSE);
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(async () => {
    handleLoad();
  }, []);

  let style1 = '';
  let style2 = '';
  if (isOpen) {
    style1 = '';
    style2 = 'w-[40%]';
  } else {
    style1 = '-mr-[32rem] opacity-0';
    style2 = 'w-[100%]';
  }
  if (!loading) {
    return (
      <>
        <div
          className={`${style2} flex flex-wrap items-center justify-around gap-4 transition-all duration-700`}
        >
          {content.map((nurse, index) => {
            return (
              <MainContentCard
                setInfoOpen={setOpen}
                open={isOpen}
                key={index}
                component={nurse}
                setIsNurse={setIsNurse}
              />
            );
          })}
        </div>

        <div
          className={` ${style1} absolute top-0 right-0 z-20 h-[100%] w-[50%]  rounded-l-lg bg-auto-white shadow-lg transition-all duration-500 ease-in-out`}
        >
          <div className="flex w-[100%] flex-col items-center justify-start gap-4 p-4">
            <button
              onClick={() => {
                setOpen(false);
              }}
              className="absolute top-[14rem] -left-[2.8rem] rounded bg-blue-600 p-4 font-bold text-white shadow-lg hover:bg-blue-800 hover:text-white"
            >
              Close
            </button>
            <div className="flex w-[100%] flex-row items-center justify-between bg-auto-white text-large font-extrabold text-auto-black shadow-sm">
              Nurse Details
            </div>
            {isNurse && (
              <div className="flex flex-row flex-wrap items-center justify-between rounded bg-auto-white p-2 shadow-lg shadow-gray-200 ring-2 ring-gray-200 hover:bg-white hover:ring-2 hover:ring-gray-300">
                <>
                  <div className="text-[18px] font-bold tracking-wider">
                    {isNurse.Fname}
                  </div>
                  <div className="text-[18px] font-bold tracking-wider">
                    {isNurse.Lname}
                  </div>
                </>
              </div>
            )}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="flex items-center justify-center">
        <InfinitySpin width="300" color="#475569" />;
      </div>
    );
  }
};

export default MainContent;
