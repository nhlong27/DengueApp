import React, { useState } from 'react';
import DeviceSearchCreate from './DeviceSearchCreate';
import MainContent from './MainContent';

const DeviceContent = (props) => {
  const [search, setSearch] = useState('');
  
  return (
    <>
      <div className="flex items-center justify-start p-2 shadow-sm">
        <DeviceSearchCreate
          setRefresh={props.setRefresh}
          search={search}
          setSearch={setSearch}
        />
      </div>
      <div
        // onScroll={() => console.log('scroll')}
        className="scrollbar relative flex-grow overflow-x-hidden overflow-y-scroll p-8"
      >
        <MainContent refresh={props.refresh} />
      </div>
    </>
  );
};

export default DeviceContent;
