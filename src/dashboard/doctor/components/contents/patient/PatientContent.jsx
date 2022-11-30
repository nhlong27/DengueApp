import React from 'react';
import { HOST } from '@/shared/constants/credentials';
import TransitionsModal from '@/shared/utilities/Modal';
import PatientSearchCreate from './PatientSearchCreate';
import MainContent from './MainContent';

const PatientContent = () => {
  return (
    <>
      <div className="flex h-[10%] items-center justify-between pl-4 pr-8 shadow-lg">
        <PatientSearchCreate />
      </div>
      <div className="scrollbar relative flex-grow overflow-x-hidden overflow-y-scroll p-8">
        <MainContent />
      </div>
    </>
  );
};

export default PatientContent;
