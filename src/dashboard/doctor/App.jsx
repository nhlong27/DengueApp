import React, { useEffect, useState, createContext } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Chatbox from './Chatbox';
import ContentContainer from './ContentContainer';
import { client } from '@/shared/api/initClient_tenant';
import { LineChart } from './components-supabase/contents/patient/SingleLineChart';
import { AiOutlineDown } from 'react-icons/ai';
import { Provider, atom, useAtom } from 'jotai';
import { userSession } from '../Auth';

export const deviceList = atom([]);
export const telemetries = atom({ something: atom(0) });
export const facilityList = atom({});

function App() {
  const [session] = useAtom(userSession);
  const [isChart, setIsChart] = useState({
    open: false,
    type: 'all',
    device: 'something',
  });
  const [location, setLocation] = useState('Dashboard');
  let chartStyle = isChart.open ? 'opacity-100 z-1' : ' opacity-0 p-0 -z-10';

  return (
    // <Provider>
    <div className="flex h-screen w-screen flex-auto bg-auto-white">
      <Sidebar setLocation={setLocation} />
      <div className="relative flex flex-grow flex-col">
        <Navbar setLocation={setLocation} location={location} />

        <main className="flex h-[90%] w-[100%] flex-auto">
          <ContentContainer setIsChart={setIsChart} />

          <div className="ml-auto flex w-[25%] flex-col items-center justify-start overflow-y-scroll bg-auto-white shadow-lg">
            <Chatbox />
          </div>
        </main>

        {isChart.open && (
          <div
            className={`${chartStyle} transition-full absolute bottom-0 left-[3rem] h-[35rem] w-[61rem] rounded bg-auto-white p-4 shadow-2xl ring-2 ring-black duration-300`}
          >
            <div className="flex w-[100%] items-center justify-start">
              <button
                onClick={() => {
                  setIsChart({ open: false, type: 'all', device: '' });
                }}
                className="rounded p-2 font-bold"
              >
                <AiOutlineDown className="hover:text-gray-300" color="black" size={30} />
              </button>
              <span className="text-large font-extrabold tracking-wider text-gray-600">
                Line Chart -
                <span
                  className={`font-extrabold capitalize tracking-wider ${
                    (isChart.type === 'all' && 'text-gray-600') ||
                    (isChart.type === 'temperature' && 'text-orange-400') ||
                    (isChart.type === 'SpO2' && 'text-blue-400') ||
                    (isChart.type === 'HrtPressure' && 'text-purple-400')
                  }`}
                >
                  {isChart.type}
                </span>
              </span>
              <div className="ml-auto flex gap-2 rounded-lg bg-white">
                <button
                  onClick={() =>
                    setIsChart((prev) => ({ ...prev, open: true, type: 'all' }))
                  }
                  className="flex items-center justify-center rounded-lg  bg-gray-400 px-4 py-2 tracking-wide text-white ring-2 ring-black ring-offset-1 ring-offset-white hover:bg-gray-500"
                >
                  All
                </button>
                <button
                  onClick={() =>
                    setIsChart((prev) => ({
                      ...prev,
                      open: true,
                      type: 'temperature',
                    }))
                  }
                  className="flex items-center justify-center rounded-lg  bg-orange-400 px-4  py-2 tracking-wide text-white ring-2 ring-black ring-offset-1 ring-offset-white hover:bg-orange-500"
                >
                  Temperature
                </button>
                <button
                  onClick={() =>
                    setIsChart((prev) => ({ ...prev, open: true, type: 'SpO2' }))
                  }
                  className="flex items-center justify-center rounded-lg  bg-blue-400 px-4 py-2 tracking-wide text-white ring-2 ring-black ring-offset-1 ring-offset-white hover:bg-blue-500"
                >
                  SpO2
                </button>
                <button
                  onClick={() =>
                    setIsChart((prev) => ({
                      ...prev,
                      open: true,
                      type: 'HrtPressure',
                    }))
                  }
                  className="flex items-center justify-center rounded-lg  bg-purple-400 px-4 py-2 tracking-wide text-white ring-2 ring-black ring-offset-1 ring-offset-white hover:bg-purple-500"
                >
                  Heart rate
                </button>
              </div>
            </div>
            <div className="relative h-[80%] w-[100%]">
              <LineChart isChart={isChart} />
            </div>
          </div>
        )}
      </div>
    </div>
    // </Provider>
  );
}

export default App;
