import React, { useState, useEffect } from 'react';
import MainContentCard from './MainContentCard';
import { InfinitySpin } from 'react-loader-spinner';
import { supabase } from '@/shared/api/supabase/supabaseClient';

const MainContent = () => {
  // const [avai, setAvai] = useState(false);
  const [content, setContent] = useState([])
  const [loading, setLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [isDevice, setIsDevice] = useState({});
  const handleLoad = async () => {
    try {
      setLoading(true);
      let { data: DEVICE, error } = await supabase.from('DEVICE').select('*');
      if (error) throw error;
      console.log('load device success!');
      setContent(DEVICE)
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
          className={`${style2} flex min-h-[99%] flex-wrap items-start justify-around rounded-3xl bg-gray-300 p-8 transition-all duration-700`}
        >
          {content.map((device, index) => {
            return (
              <MainContentCard
                setInfoOpen={setOpen}
                open={isOpen}
                key={index}
                component={device}
                setIsDevice={setIsDevice}
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
              Device Details
            </div>
            {isDevice && (
              <div className="flex w-[100%] flex-row items-center justify-between rounded bg-auto-white p-2 shadow-lg shadow-gray-200 ring-2 ring-gray-200 hover:bg-white hover:ring-2 hover:ring-gray-300">
                <div className="text-[18px] font-bold tracking-wider">
                  {isDevice.Label}
                </div>
                <div className="text-blue-600">{isDevice.Type}</div>
                {isDevice.Assign === 'No' ? (
                  <div className="text-gray-500">Not assigned</div>
                ) : (
                  <div className="text-red-500">Not assigned</div>
                )}
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
