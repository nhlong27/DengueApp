import React from 'react';
import { HOST } from '@/shared/constants/credentials';
import TransitionsModal from '@/shared/utilities/Modal';
import PatientSearchCreate from './PatientSearchCreate';
import MainContent from './MainContent';

const PatientContent = () => {
  return (
    <>
      <div className="flex items-center justify-start p-2 shadow-sm">
        <PatientSearchCreate value={value} setValue={setValue} />
      </div>
      <div className="scrollbar relative flex-grow overflow-x-hidden overflow-y-scroll p-8">
        {/* <MainContent /> */}
      </div>
    </>
  );
};

export default PatientContent;
