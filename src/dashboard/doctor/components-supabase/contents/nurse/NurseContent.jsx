import React, { useState } from 'react';
import MainContent from './MainContent';
import NurseSearchCreate from './NurseSearchCreate';

//Create modal V
//Room Multiselect V
//Invite through email V
const NurseContent = () => {
  const [value, setValue] = useState('');
  return (
    <>
      <div className="flex items-center justify-start p-2 shadow-sm">
        <NurseSearchCreate value={value} setValue={setValue} />
      </div>
      <div className="scrollbar relative flex-grow overflow-x-hidden overflow-y-scroll p-8">
        <MainContent />
      </div>
    </>
  );
};

export default NurseContent;
