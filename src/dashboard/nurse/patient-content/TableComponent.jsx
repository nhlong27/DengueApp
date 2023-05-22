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
import { useAtom } from 'jotai';
import { InfinitySpin } from 'react-loader-spinner';
import { chosenPatient } from '../AppNurse';

export const TableComponent = ({ row }) => {
  const [telemetries, setTelemetries] = useState({
    temperature: 0,
    SpO2: 0,
    HrtPressure: 0,
  });
  const [chosen, setChosen] = useAtom(chosenPatient);

  const subscribeToTelemetry = () => {
    const MESSAGE = supabase
      .channel('custom-inset-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'MESSAGE' },
        (payload) => {
          if (payload.new.D_Id === row.D_Id) {
            console.log('Change received!', payload);
            telemetries.temperature = payload.new.Temperature;
            telemetries.SpO2 = payload.new.SpO2;
            telemetries.HrtPressure = payload.new.Pressure;
          }
        },
      )
      .subscribe();
  };
  useEffect(() => {
    subscribeToTelemetry();
  }, []);
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
                (row.Status === 'Febrile' && 'bg-orange-400 ring-orange-400') ||
                (row.Status === 'Critical' && 'bg-red-500 ring-red-500') ||
                (row.Status === 'Recovery' && 'bg-green-400 ring-green-400') ||
                (row.Status === 'None' && 'bg-blue-400 ring-blue-400')
              }`}
            ></span>
            <span
              className={`font-bold capitalize tracking-wider ${
                (row.Status === 'Febrile' && 'text-orange-400') ||
                (row.Status === 'Critical' && 'text-red-500') ||
                (row.Status === 'Recovery' && 'text-green-400') ||
                (row.Status === 'None' && 'text-blue-400')
              }
              `}
            >
              {row.Status}
            </span>
          </div>
          <button
            onClick={() => {
              setChosen(() => ({ ...row }));
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
          {telemetries.temperature}
        </span>
      </TableCell>
      <TableCell color="green">
        <span className="rounded-2xl p-2 text-[30px] font-bold text-blue-400 ring-2 ring-blue-400">
          {telemetries.SpO2}
        </span>
      </TableCell>
      <TableCell color="yellow">
        <span className="rounded-2xl p-2 text-[30px] font-bold text-purple-400 ring-2 ring-purple-400">
          {telemetries.HrtPressure}
        </span>
      </TableCell>
    </TableRow>
  );
};
