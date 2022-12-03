import React, { useState } from 'react';
import DeviceSearchCreate from './DeviceSearchCreate';
// import MainContent from './MainContent';

const DeviceContent = () => {
  const [value, setValue] = useState('');
  return (
    <>
      <div className="flex items-center justify-start shadow-sm p-2">
        <DeviceSearchCreate value={value} setValue={setValue} />
      </div>
      <div className="scrollbar relative flex-grow overflow-x-hidden overflow-y-scroll p-8">
        {/* <MainContent /> */}
      </div>
    </>
  );
};

export default DeviceContent;
