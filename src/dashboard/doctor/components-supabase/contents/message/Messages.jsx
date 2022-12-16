import React, { useState } from 'react';
import SearchBar from '../../SearchBar';
import { facilityList } from '@/dashboard/doctor/App';
import { useAtom } from 'jotai';
import { RiSendPlane2Line } from 'react-icons/ri';
import MessageContainer from './MessageContainer';

const Messages = () => {
  const [room, setRoom] = useState(null);
  const [facilities] = useAtom(facilityList);
  return (
    <>
      <div className="flex items-center justify-start p-2 shadow-sm ">
        <div className="ml-auto flex h-[80%] w-[50%] items-center justify-center rounded-[3rem] bg-black p-2 shadow-lg">
          <SearchBar />
        </div>
      </div>
      <div className="relative flex h-[100%] bg-gray-300 overflow-hidden">
        <div className="h-[100%] w-[40%] py-4 pr-4 pl-8 shadow-lg">
          <div className="flex h-[100%] w-[100%] flex-col justify-between rounded-2xl bg-auto-white p-4 shadow-lg ring-2 ring-black">
            <div className="flex h-[100%] w-[100%] flex-col items-center justify-between rounded-2xl p-4 shadow-xl ring-2 ring-gray-200">
              <div className="flex h-[30%] w-[100%] ring-2 ring-black rounded-3xl z-10 shadow-xl flex-wrap items-start justify-start p-4 gap-4">
                {facilities ? (
                  Object.values(facilities).map((room, index) => {
                    return (
                      <div
                        onClick={() => setRoom(room)}
                        key={index}
                        className="text-extrabold rounded-lg px-4 py-2 text-center shadow-lg ring-2 ring-gray-300 hover:ring-black focus:ring-black"
                      >
                        <span className="text-blue-600">Room </span> {room.R_Number}
                      </div>
                    );
                  })
                ) : (
                  <div>No room currently</div>
                )}
              </div>
              <div className="scrollbar flex h-[70%] z-0 w-[100%] flex-col gap-2 overflow-x-hidden overflow-y-scroll rounded-b-2xl border-l-2 border-black bg-gradient-to-t from-gray-200 to-auto-white pt-4">
                {room ? (
                  room.nurses.map((nurse, index) => {
                    return (
                      <div className="transition-all duration-300 hover:border-r-4 hover:border-black">
                        <div
                          className="ml-2 max-w-[15rem] rounded-lg px-4 py-2 shadow-lg ring-2 ring-gray-300 transition-all duration-300 hover:ml-8 hover:ring-black"
                          key={index}
                        >
                          <span>{nurse.Fname} </span>
                          {nurse.Lname}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="transition-all duration-300 hover:border-r-4 hover:border-black">
                    <div className="ml-2 max-w-[15rem] rounded-lg px-4 py-2 shadow-lg ring-2 ring-gray-300 transition-all duration-300 hover:ml-8 hover:ring-black">
                      Pick a room
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-[100%] w-[60%] flex-col bg-gray-500 ">
          <div className="h-[85%] w-[100%] overflow-y-scroll scrollbar">
            <MessageContainer room={room} />
          </div>
          <div className=" flex h-[15%] w-[100%] items-start justify-end bg-gray-300 p-3 shadow-sm">
            <div className="h-[70%] w-[70%] rounded-3xl bg-auto-white ">
              <input
                type="text"
                className="h-[100%] w-[100%] rounded-3xl  bg-auto-white px-4 text-[18px] text-black"
                placeholder="Aa..."
                onChange={(e) => handleChange(e)}
              />
            </div>
            <button className="ml-2 rounded-full py-2 pl-3 pr-2 hover:bg-gray-200">
              <RiSendPlane2Line color="white" size={30} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
