import React, { useState, useEffect } from 'react';
import { DashboardTable } from './MainContentCard';
import { InfinitySpin } from 'react-loader-spinner';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { AiOutlineLeft } from 'react-icons/ai';
import { useAtom } from 'jotai';
import { userSession } from '@/dashboard/Auth';
import NurseAvatar from './NurseAvatar';

const MainContent = (props) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [isNurse, setIsNurse] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);

  const [session] = useAtom(userSession)

  const listenUpdate = async () => {
    const NURSE = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'NURSE' },
        (payload) => {
          console.log('Change received!', payload);
          setIsUpdate((state) => !state);
        },
      )
      .subscribe();
  };

  const handleLoad = async () => {
    try {
      setLoading(true);
      let { data: NURSE, error } = await supabase.from('NURSE').select('*').eq('D_Ssn', session.user.id);
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
    await handleLoad();
  }, [props.refresh, isUpdate]);

  useEffect(() => {
    listenUpdate();
  }, []);

  let style1 = '';
  let style2 = '';
  if (isOpen) {
    style1 = '';
    style2 = 'w-[40%]';
  } else {
    style1 = '-mr-[64rem] opacity-0';
    style2 = 'w-[100%]';
  }
  if (!loading) {
    return (
      <div className="absolute min-h-screen w-[95%] rounded-lg bg-gray-300 p-2">
        <DashboardTable
          rows={content}
          setInfoOpen={setOpen}
          open={isOpen}
          setIsNurse={setIsNurse}
        />

        <div
          className={` ${style1} absolute top-0 right-0 min-h-[100%] w-[100%]  rounded-l-lg bg-gray-200 shadow-2xl ring-2 ring-black transition-all duration-500 ease-in-out`}
        >
          <div className=" flex w-[100%] flex-col items-center justify-start gap-4 p-4">
            <div className="flex w-[100%] flex-row items-center justify-start bg-auto-white text-large font-extrabold text-auto-black shadow-sm">
              <button
                onClick={() => {
                  setOpen(false);
                }}
                className="rounded p-2 font-bold  "
              >
                <AiOutlineLeft className="hover:text-gray-300" color="black" size={30} />
              </button>
              <span>Nurse Details</span>
            </div>
            {isNurse && (
              <div className="grid w-[100%] grid-cols-4 gap-8">
                <div className="col-span-1  grid h-[20rem] min-w-[15rem] grid-cols-2 grid-rows-5 gap-4 divide-y-2 divide-gray-400 rounded bg-auto-white p-4 ring-2 ring-gray-300">
                  <div className="relative col-span-2 row-span-4 flex flex-col items-center justify-between gap-2">
                    <NurseAvatar isNurse={isNurse} />
                    <div className="flex w-[100%] items-center justify-between">
                      <div
                        className={`h-[1rem] w-[1rem] rounded-full ring-2 ring-offset-2`}
                      ></div>
                      <div className="text-[22px] font-semibold tracking-widest text-black">
                        {isNurse.Fname}
                      </div>
                      <div className="ml-2 text-[22px] font-semibold tracking-widest text-black">
                        {isNurse.Lname}
                      </div>
                    </div>
                    <div className="w-[100%]">
                      <span className="font-bold text-blue-500">Email</span>:{' '}
                      {isNurse.Email}
                    </div>
                  </div>
                  
                </div>
                <div className="col-span-3 rounded ring-2 ring-gray-300"></div>
              </div>
            )}
          </div>
        </div>
      </div>
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
