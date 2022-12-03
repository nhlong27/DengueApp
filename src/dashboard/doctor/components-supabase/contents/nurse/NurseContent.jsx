import React from 'react'
import MainContent from './MainContent';
import NurseSearchCreate from './NurseSearchCreate';


const NurseContent = () => {
  return (
    <>
      <div className="flex items-center justify-start p-2 shadow-sm">
        <NurseSearchCreate value={value} setValue={setValue} />
      </div>
      <div className="scrollbar relative flex-grow overflow-x-hidden overflow-y-scroll p-8">
        {/* <MainContent /> */}
      </div>
    </>
  );
};

export default NurseContent