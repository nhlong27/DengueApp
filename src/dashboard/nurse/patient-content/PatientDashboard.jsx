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

import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { userSession } from '@/dashboard/Auth';
import { TableComponent } from './TableComponent';
export const PatientDashboard = (props) => {
  const [session] = useAtom(userSession);

  const listenStatusUpdate = () => {
    const PATIENT = supabase
      .channel('custom-update-channel')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'PATIENT' },
        (payload) => {
          console.log('Change received!', payload);
          props.loadAndFilterPatientList();
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
              {props.rows &&
                props.rows.map((row, index) => <TableComponent key={index} row={row} />)}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

export default PatientDashboard;
