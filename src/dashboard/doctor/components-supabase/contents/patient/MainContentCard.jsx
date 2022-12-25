// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
/////////
import React, { useContext, useState } from 'react';
import { BsPeopleFill } from 'react-icons/bs';
// import { telemetries } from '../../ContentContainer';
import { useEffect } from 'react';
// import { ContentContainerContext } from '../../ContentContainer';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { telemetries } from '@/dashboard/doctor/App';
import { useAtom } from 'jotai';
import { InfinitySpin } from 'react-loader-spinner';

const statusObj = {
  // applied: { color: 'info' },
  Febrile: { color: 'error' },
  none: { color: 'primary' },
  Incubation: { color: 'warning' },
  Recovery: { color: 'success' },
};

export const DashboardTable = (props) => {
  const listenStatusUpdate = () => {
    const PATIENT = supabase
      .channel('custom-update-channel')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'PATIENT' },
        (payload) => {
          console.log('Change received!', payload);
          props.setIsUpdate((state) => !state);
        },
      )
      .subscribe();
  };
  useEffect(() => {
    listenStatusUpdate();
  }, []);
  return (
    <>
      <Card
        sx={{
          backgroundColor: '#F7F7FF',
          borderRadius: '25px',
          border: '2px solid black',
          minWidth: '100%',
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>
                  <span className="p-2 text-[16px] font-bold">Status</span>
                </TableCell>
                <TableCell>
                  <span className="text-[16px] font-bold">Name</span>
                </TableCell>
                <TableCell>
                  <span className="text-[16px] font-bold">Device</span>
                </TableCell>
                <TableCell>
                  <span className="text-[16px] font-bold">Assigned To</span>{' '}
                </TableCell>
                <TableCell>
                  <span className="text-[16px] font-bold">Temperature</span>
                </TableCell>
                <TableCell>
                  <span className="text-[16px] font-bold">SpO2</span>
                </TableCell>
                <TableCell>
                  <span className="text-[16px] font-bold">Heart Pressure</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rows.map((row, index) => (
                <TableComponent
                  key={index}
                  row={row}
                  setInfoOpen={props.setInfoOpen}
                  setIsPatient={props.setIsPatient}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

const TableComponent = ({ row, setInfoOpen, setIsPatient }) => {
  const [tele] = useAtom(telemetries);

  const [currTele] = tele[`${row.D_Id}`]
    ? useAtom(tele[`${row.D_Id}`])
    : useAtom(tele.something);

  return (
    <TableRow
      hover
      key={row.P_Ssn}
      sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
    >
      <TableCell>
        <div className="flex flex-col items-center justify-around">
          <div className="flex w-[100%] items-center justify-start gap-2">
            <span
              className={`h-[1.5rem] w-[1.5rem] rounded-full ring-2 ring-offset-2 ${
                (row.Status === 'Incubation' && 'bg-yellow-400 ring-yellow-400') ||
                (row.Status === 'Febrile' && 'bg-orange-400 ring-orange-400') ||
                (row.Status === 'Emergency' && 'bg-red-400 ring-red-400') ||
                (row.Status === 'Recovery' && 'bg-green-400 ring-green-400') ||
                (row.Status === 'None' && 'bg-gray-400 ring-gray-400') ||
                'bg-blue-400'
              }`}
            ></span>
            <span
              className={`font-bold capitalize tracking-wider ${
                (row.Status === 'Incubation' && 'text-yellow-400') ||
                (row.Status === 'Febrile' && 'text-orange-400') ||
                (row.Status === 'Emergency' && 'text-red-400') ||
                (row.Status === 'Recovery' && 'text-green-400') ||
                (row.Status === 'None' && 'text-gray-400') ||
                'text-blue-400'
              }
              `}
            >
              {row.Status}
            </span>
          </div>
          <button
            onClick={() => {
              setInfoOpen(true);
              setIsPatient(row);
            }}
            className="my-auto mt-4 rounded-lg p-2 ring-2 ring-gray-200 hover:ring-black"
          >
            Details
          </button>
        </div>
      </TableCell>
      <TableCell sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontWeight: 500, fontSize: '1.3rem !important' }}>
            <BsPeopleFill />
            {row.Fname}
          </Typography>
          <Typography sx={{ fontSize: '1rem' }} variant="caption">
            {row.Lname}
          </Typography>
        </Box>
      </TableCell>
      <TableCell sx={{ fontSize: '1rem' }}>{row.D_Label}</TableCell>
      <TableCell sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontWeight: 500, fontSize: '1.3rem !important' }}>
            {row.B_Number}
          </Typography>
          <Typography sx={{ fontSize: '0.8rem' }} variant="caption">
            {'Bed number'}
          </Typography>
        </Box>
      </TableCell>
      <TableCell color="purple">
        <span className="rounded-2xl p-2 text-[30px] font-bold text-orange-400 ring-2 ring-orange-400">
          {currTele && currTele.temperature}
        </span>
      </TableCell>
      <TableCell color="green">
        <span className="rounded-2xl p-2 text-[30px] font-bold text-blue-400 ring-2 ring-blue-400">
          {currTele && currTele.SpO2}
        </span>
      </TableCell>
      <TableCell color="yellow">
        <span className="rounded-2xl p-2 text-[30px] font-bold text-purple-400 ring-2 ring-purple-400">
          {currTele && currTele.HrtPressure}
        </span>
      </TableCell>
    </TableRow>
  );
};

// export default MainContentCard;

// const MainContentCard = (
//   { open, component, setInfoOpen, setIsPatient } = {
//     open: null,
//     component: '',
//     setInfoOpen: null,
//     setIsPatient: null,
//   },
// ) => {
//   return (
//     <div
//       onClick={() => {
//         setInfoOpen(true);
//         setIsPatient(component);
//       }}
//       className="z-10 flex h-[4rem] w-[100%] items-center justify-start gap-4 rounded-lg bg-auto-white p-2 shadow-lg transition-all duration-300 ease-in-out hover:bg-white hover:ring-2 hover:ring-gray-300"
//     >
//       <div className="h-[80%] w-[4%] ring-2 ring-white rounded-full bg-green-400">Status</div>
//       <div className="grid h-[100%] min-w-[20%] grid-cols-2 grid-rows-2 items-center justify-between">
//         <div className="col-span-2 row-span-1 flex items-center justify-center rounded-sm border-b-2 border-gray-300  ">
//           <div className="text-[18px] font-semibold tracking-[3px] text-black">
//             <BsPeopleFill />
//           </div>
//           <div className="text-[18px] font-semibold tracking-[3px] text-black">
//             {component.Fname}
//           </div>
//           <div className="text-[18px] font-semibold tracking-[3px] text-black">
//             {component.Lname}
//           </div>
//         </div>
//         <div className="col-span-2 row-span-1 grid h-[50%] w-[100%] grid-cols-2"></div>
//       </div>
//       <button className="ml-auto rounded bg-cyan-100 bg-opacity-5 p-4 text-base font-bold text-gray-400 transition-all duration-500 hover:bg-opacity-100 hover:text-gray-600  hover:ring-2 hover:ring-gray-200">
//         Update
//       </button>
//     </div>
//   );
// };
