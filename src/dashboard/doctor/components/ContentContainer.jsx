import React from 'react';
import SearchCreate from './contents/facility/FacilitySearchCreate';
import { Routes, Route } from 'react-router-dom';
import PatientContent from './contents/PatientContent';
import FacilitiesContent from './contents/facility/FacilitiesContent';
import NursesContent from './contents/NursesContent';
import DevicesContent from './contents/DevicesContent';

const ContentContainer = () => {
  return (
    <div className="flex flex-auto basis-[75%] flex-col">
      <Routes>
        <Route path="/pages/dashboard/doctor/index.html" element={<PatientContent />} />
        <Route
          path="/pages/dashboard/doctor/facilities"
          element={<FacilitiesContent />}
        />
        <Route path="/pages/dashboard/doctor/nurses" element={<NursesContent />} />
        <Route path="/pages/dashboard/doctor/devices" element={<DevicesContent />} />
      </Routes>
    </div>
  );
};

export default ContentContainer;
