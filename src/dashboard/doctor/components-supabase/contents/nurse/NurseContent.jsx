import React, { useState } from 'react';
import MainContent from './MainContent';
import NurseSearchCreate from './NurseSearchCreate';

//Create modal V
//Room Multiselect V
//Invite through email V
const NurseContent = (props) => {
  const [search, setSearch] = useState('');
  return (
    <>
      <div className="flex items-center justify-start p-2 shadow-sm">
        <NurseSearchCreate search={search} setSearch={setSearch} setRefresh={props.setRefresh} />
      </div>
      <div className="scrollbar relative flex-grow overflow-x-hidden overflow-y-scroll p-8">
        <MainContent handleLoadNurse={props.handleLoadNurse} />
      </div>
    </>
  );
};

export default NurseContent;
