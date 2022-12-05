import React, { useContext, useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import { AiOutlineUp } from 'react-icons/ai';
import { MdMeetingRoom } from 'react-icons/md';
import { MdBedroomChild } from 'react-icons/md';

const MainContentCard = (
  { open, component, setInfoOpen, setIsRoom } = {
    open: null,
    component: '',
    setInfoOpen: null,
    setIsRoom: null,
  },
) => {
  const [isRoomContainer, setIsRoomContainer] = useState(false);
  let styles = isRoomContainer? 'visible opacity-100' : '-mt-[6rem] invisible opacity-0'
  return (
    <div className="w-[100%] bg-auto-white z-0 relative rounded-lg">
      <div className="shadow-lg relative z-10  grid w-[100%] grid-cols-3 rounded-lg bg-auto-white hover:bg-white transition-all duration-300 ease-in-out ring-2 ring-gray-300">
        <div className="col-span-1 flex items-center justify-start">
          <div className="flex w-[30%] flex-col items-start justify-start">
            <div className="px-4 text-[22px] font-semibold tracking-widest text-black">
              <MdMeetingRoom /> <span>{component.R_Number}</span>
            </div>
          </div>
          {/* {open ? (
          <div className="ml-auto flex h-[100%] w-[100%] items-center justify-center gap-[5rem] opacity-0">
            <div className="h-[100%] ">Telemetry 1</div>
            <div className="h-[100%] ">Telemetry 2</div>
            <div className="h-[100%] ">Telemetry 3</div>
          </div>
        ) : (
          <div className="ml-auto flex h-[100%] w-[100%] items-center justify-center gap-[5rem]">
            <div className="h-[100%] ">Telemetry 1</div>
            <div className="h-[100%] ">Telemetry 2</div>
            <div className="h-[100%] ">Telemetry 3</div>
          </div>
        )} */}
        </div>
        <button className="col-span-1 rounded bg-auto-white bg-opacity-5 p-4 text-base font-bold text-gray-400 transition-all duration-500 hover:bg-opacity-100 hover:text-gray-600  hover:ring-2 hover:ring-gray-200">
          Update
        </button>

        <button
          onClick={() => {
            setIsRoomContainer((state) => !state);
          }}
          className="relative z-10 col-span-1 rounded bg-auto-white bg-opacity-5 p-4 text-base font-bold text-gray-400 transition-all duration-500 hover:bg-opacity-100 hover:text-gray-600  hover:ring-2 hover:ring-gray-200 focus:rounded-r-lg focus:bg-white focus:text-auto-black "
        >
          {isRoomContainer ? <AiOutlineUp className="ml-auto" size={30} color="black" /> : <AiOutlineDown className="ml-auto" size={30} color="black" />}
        </button>
      </div>
      <RoomContainer room={component} styles={styles} setOpen={setInfoOpen}/>
    </div>

    // <button
    //     onClick={() => {
    //       setInfoOpen(true);
    //       setIsRoom(component);
    //     }}
    //     className="col-span-1 rounded bg-cyan-100 bg-opacity-5 p-4 text-base font-bold text-gray-400 transition-all duration-500 hover:bg-opacity-100 hover:text-gray-600  hover:ring-2 hover:ring-gray-200 focus:bg-cyan-200 focus:text-auto-black "
    //   >
    //     <AiOutlineDown className='ml-auto' size={30} color='black'/>
    //   </button>
  );
};

const RoomContainer = (props) => {
  return (
    <div
      className={`${props.styles} mx-auto my-4 flex w-[90%] flex-wrap gap-8 rounded-lg bg-auto-white transition-all duration-500`}
    >
      {Object.values(props.room.beds).map((bed, index) => (
        <button onClick={()=>{
          props.setOpen(true);
        }} className="min-w-[10%] w-[15%] rounded-lg bg-gray-300 p-2 text-center hover:bg-gray-400" key={index}>
          <MdBedroomChild className='inline-block mr-2' />
          <span>{bed.B_Number}</span>
        </button>
      ))}
    </div>
  );
};
export default MainContentCard;
