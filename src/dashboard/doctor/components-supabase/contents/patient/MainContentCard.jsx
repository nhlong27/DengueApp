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
import { ContentContainerContext } from '../../ContentContainer';
import { supabase } from '@/shared/api/supabase/supabaseClient';

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

const statusObj = {
  // applied: { color: 'info' },
  Febrile: { color: 'error' },
  none: { color: 'primary' },
  Incubation: { color: 'warning' },
  Recovery: { color: 'success' },
};

export const DashboardTable = (props) => {
  const { telemetries } = useContext(ContentContainerContext);
  const reload = async () => {
    for (let row of props.rows) {
      console.log(row);
      if (row.D_Id) {
        const { data: TELEMETRY, error } = await supabase
          .from('TELEMETRY')
          .select('*')
          .eq('D_Id', row.D_Id);
        console.log(TELEMETRY);
        row.Status = TELEMETRY[TELEMETRY.length - 1].Status;
      }
    }
  };
  useEffect(() => {
    reload();
  }, []);
  return (
    <Card sx={{ backgroundColor: '#F7F7FF' }}>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
          <TableHead>
            <TableRow>
              <TableCell>
                <span className="text-[16px] font-bold">Status</span>
              </TableCell>
              <TableCell>
                <span className="text-[16px] font-bold">Name</span>
              </TableCell>
              <TableCell>
                <span className="text-[16px] font-bold">Email</span>
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
            {props.rows.map((row) => (
              <TableRow
                hover
                key={row.P_Ssn}
                sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
              >
                <TableCell>
                  <Chip
                    label={row.Status}
                    color={statusObj[row.Status].color}
                    sx={{
                      height: 26,
                      fontSize: '1rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 },
                    }}
                  />
                  <button
                    onClick={() => {
                      props.setInfoOpen(true);
                      props.setIsPatient(row);
                    }}
                    className="my-auto mt-4 rounded-lg p-2 ring-2 ring-gray-200 hover:ring-black"
                  >
                    Details
                  </button>
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
                <TableCell sx={{ fontSize: '1rem' }}>{row.Email}</TableCell>
                <TableCell sx={{ fontSize: '1rem' }}>{row.D_Id}</TableCell>
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
                  <span className="text-[20px] text-purple-600">
                    {telemetries[`${row.D_Id}`] && telemetries[`${row.D_Id}`].temperature}
                  </span>
                </TableCell>
                <TableCell color="green">
                  <span className="text-[20px] text-green-600">
                    {telemetries[`${row.D_Id}`] && telemetries[`${row.D_Id}`].SpO2}
                  </span>
                </TableCell>
                <TableCell color="yellow">
                  <span className="text-[20px] text-yellow-600">
                    {telemetries[`${row.D_Id}`] && telemetries[`${row.D_Id}`].HrtPressure}
                  </span>
                </TableCell>
                {/* <TableCell></TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

// export default MainContentCard;
