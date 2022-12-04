import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PatientContent from './contents/patient/PatientContent';
import FacilityContent from './contents/facility/FacilityContent';
import NurseContent from './contents/nurse/NurseContent';
import DeviceContent from './contents/device/DeviceContent';
import Account from './Account';

const ContentContainer = () => {
  return (
    <div className="flex flex-auto w-[75%] shrink flex-col">
      <Routes>
        <Route path="/index.html" element={<PatientContent />} />
        <Route path="/facilities" element={<FacilityContent />} />
        <Route path="/nurses" element={<NurseContent />} />
        <Route path="/devices" element={<DeviceContent />} />
      </Routes>
    </div>
  );
};

export default ContentContainer;
