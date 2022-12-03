import React, { useState } from 'react';
import FacilitySearchCreate from './FacilitySearchCreate';
import MainContent from './MainContent';

const FacilityContent = () => {
  const [value, setValue] = useState('');

  return (
    <>
      <div className="flex items-center justify-start p-2 shadow-sm">
        <FacilitySearchCreate value={value} setValue={setValue} />
      </div>
      <div className="scrollbar relative flex-grow overflow-x-hidden overflow-y-scroll p-8">
        <MainContent />
      </div>
    </>
  );
};

export default FacilityContent;
