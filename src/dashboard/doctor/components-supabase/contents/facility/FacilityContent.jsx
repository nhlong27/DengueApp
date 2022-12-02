import React, { useState } from 'react';
import FacilitySearchCreate from './FacilitySearchCreate';
import MainContent from './MainContent';

const FacilityContent = () => {
  return (
    <>
      <div className="flex h-[10%] items-center justify-between pl-4 pr-8 shadow-lg">
        <FacilitySearchCreate />
      </div>
      <div className="scrollbar relative flex-grow overflow-x-hidden overflow-y-scroll p-8">
        <MainContent />
      </div>
    </>
  );
};

export default FacilityContent;
