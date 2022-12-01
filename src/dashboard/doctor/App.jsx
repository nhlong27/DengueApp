import { client } from '@/shared/api/initClient_tenant';
import React, { useEffect, useState } from 'react';
import Chatbox from './components/Chatbox';
import ContentContainer from './components/ContentContainer';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import * as dashboardAPI from '@/shared/api/doctor/dashboard';
import * as nurseAPI from '@/shared/api/doctor/nurses';
import * as deviceAPI from '@/shared/api/doctor/devices';
import * as facilityAPI from '@/shared/api/doctor/facilities';
import { createContext } from 'react';

export var db_doctor = {};
export var assetCreationObj = {};
const AppContext = createContext();

const connectClient = async () => {
  console.log('connecting to server');
  let token = await client.connect();
  if (token) {
    db_doctor.facilityList = {};
    db_doctor.patientList = {};
    db_doctor.deviceList = {};
    db_doctor.nurseList = {};
    console.log(db_doctor);
    await dashboardAPI.loadAndFilterPatients(client);
    await nurseAPI.loadAndFilterNurses(client);
    await deviceAPI.loadAndFilterDevices(client);
    await facilityAPI.loadAndFilterFacilities(client);
  }
};

function App() {
  const [telemetry, setTelemetry] = useState({});
  useEffect(() => {
    connectClient();
  }, []);
  return (
    <AppContext.Provider value={{ telemetry, setTelemetry }}>
      <div className="flex h-screen w-screen flex-auto">
        <Sidebar />
        <div className=" flex flex-grow flex-col bg-auto-white">
          <Navbar />
          <main className="flex h-[90%] w-[100%] flex-auto">
            <ContentContainer />
            <Chatbox />
          </main>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
