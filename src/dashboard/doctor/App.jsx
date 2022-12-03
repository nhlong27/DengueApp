// import { client } from '@/shared/api/initClient_tenant';
import React, { useEffect, useState } from 'react';
// import Chatbox from './components-supabase/Chatbox';
// import ContentContainer from './components-supabase/ContentContainer';
import Navbar from './components-supabase/Navbar';
import Sidebar from './components-supabase/Sidebar';
import Chatbox from './components-supabase/Chatbox';
import ContentContainer from './components-supabase/ContentContainer';
// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
// import * as dashboardAPI from '@/shared/api/doctor/dashboard';
// import * as nurseAPI from '@/shared/api/doctor/nurses';
// import * as deviceAPI from '@/shared/api/doctor/devices';
// import * as facilityAPI from '@/shared/api/doctor/facilities';
import { createContext } from 'react';
import Auth from './Auth';
import { supabase } from '@/shared/api/supabase/supabaseClient';
// export var db_doctor = {};
// export var assetCreationObj = {};
export const AppContext = createContext();

// const connectClient = async () => {
// //   console.log('connecting to server');
// //   let token = await client.connect();
// //   if (token) {
// //     db_doctor.facilityList = {};
// //     db_doctor.patientList = {};
// //     db_doctor.deviceList = {};
// //     db_doctor.nurseList = {};
// //     console.log(db_doctor);
// //     await dashboardAPI.loadAndFilterPatients(client);
// //     await nurseAPI.loadAndFilterNurses(client);
// //     await deviceAPI.loadAndFilterDevices(client);
// //     await facilityAPI.loadAndFilterFacilities(client);
// //   }
// // };

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <AppContext.Provider value={{ session, setSession }}>
      {!session ? (
        <Auth />
      ) : (
        <div className="flex h-screen w-screen flex-auto bg-cyan-50">
          <Sidebar />
          <div
            className=" flex flex-grow flex-col"
            // style={{
            //   backgroundImage:
            //     'linear-gradient(rgba(0, 0, 255, 0.2), rgba(255, 255, 255, 0.9)), url(../../../assets/img/login.jpg)',
            // }}
          >
            <Navbar />
            <main className="flex h-[90%] w-[100%] flex-auto">
              <ContentContainer />
              <Chatbox />
            </main>
          </div>
        </div>
      )}
      {/* <div className="flex h-screen w-screen flex-auto">
        <Sidebar />
        <div className=" flex flex-grow flex-col bg-auto-white">
          <Navbar />
          <main className="flex h-[90%] w-[100%] flex-auto">
            <ContentContainer />
            <Chatbox />
          </main>
        </div>
      </div> */}
    </AppContext.Provider>
  );
}

export default App;
