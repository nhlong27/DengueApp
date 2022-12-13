import React, { useEffect, useState, createContext } from 'react';
import Navbar from './components-supabase/Navbar';
import Sidebar from './components-supabase/Sidebar';
import Chatbox from './components-supabase/Chatbox';
import ContentContainer from './components-supabase/ContentContainer';
import Auth from './Auth';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { client } from '@/shared/api/initClient_tenant';
import { LineChart } from './components-supabase/contents/patient/SingleLineChart';
import { AiOutlineDown } from 'react-icons/ai';
// export const AppContext = createContext();
function App() {
  const [isChart, setIsChart] = useState(false);
  const [location, setLocation] = useState('Dashboard');
  const [session, setSession] = useState(null);

  let chartStyle = isChart ? 'opacity-100 z-1' : 'opacity-0 p-0 -z-10';

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    // <AppContext.Provider value={{ session, setSession }}>
    <>
      {!session ? (
        <Auth />
      ) : (
        <div className="flex h-screen w-screen flex-auto bg-auto-white">
          <Sidebar setLocation={setLocation} />
          <div className="relative flex flex-grow flex-col">
            <Navbar setLocation={setLocation} location={location} session={session} />

            <main className="flex h-[90%] w-[100%] flex-auto">
              <ContentContainer setIsChart={setIsChart} session={session} />

              <div className="ml-auto flex w-[25%] flex-col items-center justify-start overflow-y-scroll bg-auto-white shadow-lg">
                <Chatbox />
              </div>
            </main>

            <div
              className={`${chartStyle} transition-full absolute bottom-0 left-[3rem] h-[35rem] w-[61rem] rounded bg-auto-white p-4 shadow-2xl ring-2 ring-black duration-300`}
            >
              <div className="w-[100%]">
                <button
                  onClick={() => {
                    setIsChart(false);
                  }}
                  className="rounded p-2 font-bold"
                >
                  <AiOutlineDown
                    className="hover:text-gray-300"
                    color="black"
                    size={30}
                  />
                </button>
                <span>Line Chart</span>
              </div>
              <div className="relative h-[80%] w-[100%]">
                <LineChart />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
    // </AppContext.Provider>
  );
}

export default App;
