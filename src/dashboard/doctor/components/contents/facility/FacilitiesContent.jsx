import React, { useState } from 'react';
import FacilitySearchCreate from './FacilitySearchCreate';
import MainContent from './MainContent';

const FacilitiesContent = () => {

  return (
    <>
      <div className='h-[10%] shadow-lg flex justify-between items-center pl-4 pr-8'>
        <FacilitySearchCreate />
      </div>
      <div className='scrollbar overflow-y-scroll overflow-x-hidden flex-grow p-8 relative'>
        <MainContent />
      </div>
    </>
  );
};


export default FacilitiesContent;



