import React, { useState } from 'react';
import FacilitySearchCreate from './FacilitySearchCreate';
import MainContent from './MainContent';

const FacilityContent = () => {
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <>
      <div className="flex items-center justify-start p-2 shadow-sm">
        <FacilitySearchCreate
          setRefresh={setRefresh}
          search={search}
          setSearch={setSearch}
        />
      </div>
      <div className="scrollbar relative flex-grow overflow-x-hidden overflow-y-scroll p-8">
        <MainContent refresh={refresh} />
      </div>
    </>
  );
};

export default FacilityContent;
