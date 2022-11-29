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

export const db_doctor = {};

const connectClient = async () => {
  console.log('connecting to server');
  let token = await client.connect();
  if (token) {
    db_doctor.patientList = await dashboardAPI.loadAndFilterPatients(client);
    db_doctor.nurseList = await nurseAPI.loadAndFilterNurses(client);
    db_doctor.deviceList = await deviceAPI.loadAndFilterDevices(client);
    db_doctor.facilityList = await facilityAPI.loadAndFilterFacilities(client);
    console.log(db_doctor);
  }
};

function App() {
  useEffect(() => {
    // connectClient();
  }, []);
  return (
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
  );
}

export default App;
