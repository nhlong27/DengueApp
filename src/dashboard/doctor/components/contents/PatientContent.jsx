import React from 'react';
import { HOST } from '@/shared/constants/credentials';
import TransitionsModal from '@/shared/utilities/Modal';

const PatientContent = () => {
  return (
    <div className="scrollbar relative flex flex-auto overflow-y-scroll">
      <div className="">
        <TransitionsModal />
      </div>
      <div className="sticky right-0 top-0 bottom-0 hidden grow">Info</div>
    </div>
  );
};

export default PatientContent;
