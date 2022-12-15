import React, { useState } from 'react';
import FacilitySearchCreate from './FacilitySearchCreate';
import MainContent from './MainContent';

const FacilityContent = (props) => {
  const [search, setSearch] = useState('');

  return (
    <>
      <div className="flex items-center justify-start p-2 shadow-sm">
        <FacilitySearchCreate
          setRefresh={props.setRefresh}
          search={search}
          setSearch={setSearch}
        />
      </div>
      <div className="scrollbar relative flex-grow overflow-x-hidden overflow-y-scroll p-8">
        <MainContent />
      </div>
    </>
  );
};

export default FacilityContent;
