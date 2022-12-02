import React from 'react'
import MainContent from './MainContent';
import NurseSearchCreate from './NurseSearchCreate';


const NurseContent = () => {
  return (
    <>
      <div className="flex h-[10%] items-center justify-between pl-4 pr-8 shadow-lg">
        <NurseSearchCreate />
      </div>
      <div className="scrollbar relative flex-grow overflow-x-hidden overflow-y-scroll p-8">
        <MainContent />
      </div>
    </>
  );
};

export default NurseContent