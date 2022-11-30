import React, { useState } from 'react';
import { db_doctor } from '@/dashboard/doctor/App';
import MainContentCard from './MainContentCard';

// const fakeObj = {
//   'Building A': {
//     id: {
//       entityType: 'ASSET',
//       id: '58baf630-6fa8-11ed-845c-3528cdac4f3b',
//     },
//     createdTime: 1669700435219,
//     additionalInfo: null,
//     tenantId: {
//       entityType: 'TENANT',
//       id: 'a150dac0-5d9e-11ed-924c-fbb3dd5f1361',
//     },
//     customerId: {
//       entityType: 'CUSTOMER',
//       id: '13814000-1dd2-11b2-8080-808080808080',
//     },
//     name: 'Building A',
//     type: 'BUILDING',
//     label: 'Building A',
//     assetProfileId: {
//       entityType: 'ASSET_PROFILE',
//       id: '143f8520-6f99-11ed-845c-3528cdac4f3b',
//     },
//     externalId: null,
//     rooms: {
//       'Room A_Building A': {
//         id: {
//           entityType: 'ASSET',
//           id: '5a253490-6fa8-11ed-845c-3528cdac4f3b',
//         },
//         createdTime: 1669700437593,
//         additionalInfo: {
//           description: '',
//         },
//         tenantId: {
//           entityType: 'TENANT',
//           id: 'a150dac0-5d9e-11ed-924c-fbb3dd5f1361',
//         },
//         customerId: {
//           entityType: 'CUSTOMER',
//           id: '13814000-1dd2-11b2-8080-808080808080',
//         },
//         name: 'Room A_Building A',
//         type: 'ROOM',
//         label: 'Room A',
//         assetProfileId: {
//           entityType: 'ASSET_PROFILE',
//           id: '4695c2e0-6f9a-11ed-845c-3528cdac4f3b',
//         },
//         externalId: null,
//         beds: {
//           'Bed B_Room A_Building A': {
//             id: {
//               entityType: 'ASSET',
//               id: '321bc3f0-6fa9-11ed-845c-3528cdac4f3b',
//             },
//             createdTime: 1669700799919,
//             additionalInfo: {
//               description: '',
//             },
//             tenantId: {
//               entityType: 'TENANT',
//               id: 'a150dac0-5d9e-11ed-924c-fbb3dd5f1361',
//             },
//             customerId: {
//               entityType: 'CUSTOMER',
//               id: '13814000-1dd2-11b2-8080-808080808080',
//             },
//             name: 'Bed B_Room A_Building A',
//             type: 'BED',
//             label: 'Bed B',
//             assetProfileId: {
//               entityType: 'ASSET_PROFILE',
//               id: '47fbe290-6f9a-11ed-845c-3528cdac4f3b',
//             },
//             externalId: null,
//           },
//           'Bed A_Room A_Building A': {
//             id: {
//               entityType: 'ASSET',
//               id: '5d010450-6fa8-11ed-845c-3528cdac4f3b',
//             },
//             createdTime: 1669700442389,
//             additionalInfo: {
//               description: '',
//             },
//             tenantId: {
//               entityType: 'TENANT',
//               id: 'a150dac0-5d9e-11ed-924c-fbb3dd5f1361',
//             },
//             customerId: {
//               entityType: 'CUSTOMER',
//               id: '13814000-1dd2-11b2-8080-808080808080',
//             },
//             name: 'Bed A_Room A_Building A',
//             type: 'BED',
//             label: 'Bed A',
//             assetProfileId: {
//               entityType: 'ASSET_PROFILE',
//               id: '47fbe290-6f9a-11ed-845c-3528cdac4f3b',
//             },
//             externalId: null,
//           },
//         },
//       },
//       'Room B_Building A': {
//         id: {
//           entityType: 'ASSET',
//           id: '7d0e6d40-6fb3-11ed-845c-3528cdac4f3b',
//         },
//         createdTime: 1669705220628,
//         additionalInfo: {
//           description: '',
//         },
//         tenantId: {
//           entityType: 'TENANT',
//           id: 'a150dac0-5d9e-11ed-924c-fbb3dd5f1361',
//         },
//         customerId: {
//           entityType: 'CUSTOMER',
//           id: '13814000-1dd2-11b2-8080-808080808080',
//         },
//         name: 'Room B_Building A',
//         type: 'ROOM',
//         label: 'Room B',
//         assetProfileId: {
//           entityType: 'ASSET_PROFILE',
//           id: '4695c2e0-6f9a-11ed-845c-3528cdac4f3b',
//         },
//         externalId: null,
//         beds: {
//           'Bed C_Room B_Building A': {
//             id: {
//               entityType: 'ASSET',
//               id: '9c4ca050-6fb3-11ed-845c-3528cdac4f3b',
//             },
//             createdTime: 1669705273045,
//             additionalInfo: {
//               description: '',
//             },
//             tenantId: {
//               entityType: 'TENANT',
//               id: 'a150dac0-5d9e-11ed-924c-fbb3dd5f1361',
//             },
//             customerId: {
//               entityType: 'CUSTOMER',
//               id: '13814000-1dd2-11b2-8080-808080808080',
//             },
//             name: 'Bed C_Room B_Building A',
//             type: 'BED',
//             label: 'Bed C',
//             assetProfileId: {
//               entityType: 'ASSET_PROFILE',
//               id: '47fbe290-6f9a-11ed-845c-3528cdac4f3b',
//             },
//             externalId: null,
//           },
//         },
//       },
//     },
//   },
// };
const MainContent = () => {
  const [isOpen, setOpen] = useState(false);
  const [isRoom, setIsRoom] = useState(null);
  let style1 = '';
  let style2 = '';
  if (isOpen) {
    style1 = '';
    style2 = 'w-[40%]';
  } else {
    style1 = '-mr-[32rem] opacity-0';
    style2 = 'w-[100%]';
  }
  if (db_doctor.facilityList) {
    return (
      <>
        <div
          className={`${style2} flex flex-col items-center justify-start transition-all duration-500`}
        >
          {Object.values(db_doctor.facilityList).map((building, index) => {
            return (
              <MainContentCard
                setIsRoom={setIsRoom}
                setInfoOpen={setOpen}
                key={index}
                component={building}
              />
            );
          })}
        </div>

        <div
          className={` ${style1} absolute top-0 right-0 z-20 h-[100%] w-[50%]  rounded-l-lg bg-auto-white shadow-lg shadow-light-important transition-all duration-500 ease-in-out`}
        >
          <div className="flex w-[100%] flex-col items-center justify-start gap-4 p-4">
            <button
              onClick={() => {
                setOpen((state) => !state);
              }}
              className="absolute top-[14rem] -left-[2.8rem] rounded bg-light-important p-4 font-bold text-auto-white shadow-lg hover:bg-cyan-300 hover:text-white"
            >
              Close
            </button>
            <div className="flex w-[100%] flex-row items-center justify-between">
              <div className="ml-4 text-[18px] font-bold">Beds</div>
              <div className="mr-4 text-[18px] font-bold">Patients</div>
            </div>

            {isRoom &&
              Object.values(isRoom.beds).map((bed, index) => {
                return (
                  <div
                    key={index}
                    className="flex w-[100%] flex-row items-center justify-between rounded bg-auto-white p-2 shadow-lg shadow-gray-200 ring-2 ring-gray-200 hover:bg-white hover:ring-2 hover:ring-gray-300"
                  >
                    <div>{bed.label}</div>
                    <div>Patient 0</div>
                  </div>
                );
              })}
          </div>
        </div>
      </>
    );
  } else {
    return <div>Loading content...</div>;
  }
};

export default MainContent;
