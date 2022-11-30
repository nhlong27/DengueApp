import React, { useState } from 'react';

const MainContentCard = (
  { component, setInfoOpen, setIsRoom } = {
    component: '',
    setInfoOpen: null,
    setIsRoom: null,
  },
) => {
  const [isOpen, setOpen] = useState(false);
  let style = '';
  if (isOpen) {
    style = '-mt-2';
  } else style = '-mt-[8rem] opacity-0 invisible';
  if (component.rooms) {
    return (
      <>
        <div className="z-10 grid w-[100%] grid-cols-2 gap-4 divide-y-2  divide-gray-400 rounded-lg bg-auto-white p-4 shadow-sm shadow-light-important ring-2 ring-gray-500 transition-all duration-1000 ease-in-out hover:shadow-lg hover:shadow-light-important mb-8">
          <div className="col-span-2 flex flex-col items-start justify-start">
            <div className="p-2 text-[18px] font-extrabold">{component.label}</div>
            <div className="px-4 text-[12px] font-semibold text-light-important">
              Type: {component.type}
            </div>
            <div className="px-4 text-[14px]">Full</div>
          </div>
          <button
            onClick={() => {
              setOpen((state) => !state);
            }}
            className="col-span-1 rounded bg-cyan-100 bg-opacity-5 p-4 text-base font-bold text-gray-400 transition-all duration-500 hover:bg-opacity-100 hover:text-gray-600  hover:ring-2 hover:ring-gray-200 focus:bg-cyan-200 focus:text-auto-black "
          >
            Rooms
          </button>
          <button className="col-span-1 rounded bg-cyan-100 bg-opacity-5 p-4 text-base font-bold text-gray-400 transition-all duration-500 hover:bg-opacity-100 hover:text-gray-600  hover:ring-2 hover:ring-gray-200">
            Update
          </button>
        </div>
        <div
          className={`${style} transition-full relative z-0 col-span-2 ml-6 w-[100%]  rounded-xl bg-light-important bg-opacity-25 duration-300 ease-in-out`}
        >
          {Object.values(component.rooms).map((room, index) => {
            return <CardBody setIsRoom={setIsRoom} setInfoOpen={setInfoOpen} key={index} component={room} />;
          })}
        </div>
      </>
    );
  } else return null;
};

const CardBody = ({ component, setInfoOpen, setIsRoom } = { component: '', setInfoOpen: null, setIsRoom: null }) => {
  if (component.beds) {
    return (
      <>
        <div className="ml-12 grid w-[93%] grid-cols-2 gap-4 divide-y-2 divide-gray-400  rounded-lg bg-auto-white p-2 shadow-sm shadow-light-important ring-2 ring-gray-500 transition-all duration-1000 ease-in-out hover:shadow-lg hover:shadow-light-important -mt-8">
          <div className="col-span-2 flex items-center justify-between">
            <div className="p-1 text-[18px] font-extrabold">{component.label}</div>
            <div className="px-2 text-[12px] font-semibold text-light-important">
              Type: {component.type}
            </div>
            <div className="px-2 text-[14px]">Full</div>
          </div>
          <button
            onClick={() => {
              setInfoOpen(true);
              setIsRoom(component);
            }}
            className="col-span-1 rounded bg-cyan-100 bg-opacity-5 p-4 text-base font-bold text-gray-400 transition-all duration-500 hover:bg-opacity-100 hover:text-gray-600  hover:ring-2 hover:ring-gray-200"
          >
            Beds
          </button>
          <button className="col-span-1 rounded bg-cyan-100 bg-opacity-5 p-4 text-base font-bold text-gray-400 transition-all duration-500 hover:bg-opacity-100 hover:text-gray-600  hover:ring-2 hover:ring-gray-200">
            Update
          </button>
        </div>
      </>
    );
  } else return null;
};
export default MainContentCard;
