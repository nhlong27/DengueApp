import React from 'react'
import DeviceSearchCreate from './DeviceSearchCreate';
import MainContent from './MainContent';


const DevicesContent = () => {
  return (
    <>
      <div className="flex h-[10%] items-center justify-between pl-4 pr-8 shadow-lg">
        <DeviceSearchCreate />
      </div>
      <div className="scrollbar relative flex-grow overflow-x-hidden overflow-y-scroll p-8">
        <MainContent />
      </div>
    </>
  );
};


export default DevicesContent