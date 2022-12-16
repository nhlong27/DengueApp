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
import { RiNurseFill } from 'react-icons/ri';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Field, Form, Formik } from 'formik';
import TransitionsModal from '@/shared/utilities/Modal';
import SelectFormField from '@/shared/utilities/form/SelectFormField';
import TextFormField from '@/shared/utilities/form/TextFormField';
import { facilityList } from '@/dashboard/doctor/App';
import { useAtom } from 'jotai';
import BasicSelect from '@/shared/utilities/form/BasicSelect';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { InfinitySpin } from 'react-loader-spinner';

export const DashboardTable = (props) => {
  const [open, setOpen] = useState(false);
  const [facilities] = useAtom(facilityList);
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState(null);
  const handleDelete = async (nurse) => {
    try {
      //Setting device and access token on thingsboard
      setLoading(true);

      await supabase.from('IS_ASSIGNED_TO').delete().eq('N_Ssn', nurse.N_Ssn);
      await supabase.from('NURSE').delete().eq('N_Ssn', nurse.N_Ssn);

      if (error) throw error;
      console.log('delete device success!');
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (values, nurse) => {
    try {
      setLoading(true);

      await supabase
        .from('NURSE')
        .update({
          Fname: values.fname,
          Lname: values.lname,
          Email: values.email,
        })
        .eq('N_Ssn', nurse.N_Ssn);

      console.log('update nurse success!');
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const handleAssign = async (room, nurse) => {
    try {
      //Setting device and access token on thingsboard
      setLoading(true);
      if (room) {
        await supabase
          .from('NURSE')
          .update({
            Assign: room,
          })
          .eq('N_Ssn', nurse.N_Ssn);
        const { data, error } = await supabase
          .from('IS_ASSIGNED_TO')
          .insert([{ N_Ssn: nurse.N_Ssn }]);
        await supabase
          .from('IS_ASSIGNED_TO')
          .update({ R_Number: room })
          .eq('N_Ssn', nurse.N_Ssn);
        console.log('assign nurse success!');
      }
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <div className="absolute bottom-[2rem] right-[3rem]">
          <InfinitySpin width="300" color="#475569" />
        </div>
      ) : (
        <Card
          sx={{
            backgroundColor: '#F7F7FF',
            borderRadius: '25px',
            border: '2px solid black',
          }}
        >
          <TableContainer>
            <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <span className="p-4 text-[16px] font-bold">Name</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-[16px] font-bold">Email</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-[16px] font-bold">Assigned To</span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.rows.map((row) => (
                  <TableRow
                    hover
                    key={row.N_Ssn}
                    sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                  >
                    <TableCell sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginLeft: '15px',

                          padding: '8px',
                        }}
                      >
                        <Typography
                          sx={{ fontWeight: 500, fontSize: '1.2rem !important' }}
                        >
                          <RiNurseFill size={24} /> <span>{row.Fname}</span>
                          <span className="ml-2 text-base ">{row.Lname}</span>
                        </Typography>

                        <button
                          onClick={() => {
                            props.setInfoOpen(true);
                            props.setIsNurse(row);
                          }}
                          className="my-auto ml-4 w-[4rem] rounded-lg p-2 ring-2 ring-gray-200 hover:ring-black"
                        >
                          Details
                        </button>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontSize: '1rem' }}>{row.Email}</TableCell>
                    <TableCell sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontWeight: 500, fontSize: '1rem !important' }}>
                          {row.Assign !== 'No' ? (
                            row.Assign
                          ) : (
                            <span className="text-red-600">None</span>
                          )}
                        </Typography>
                        <Typography variant="caption">{'Room number'}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <div
                        onClick={() => setOpen(true)}
                        className="flex items-center justify-center rounded-lg bg-auto-white px-4 py-2 text-black ring-2 ring-gray-300 hover:ring-black"
                      >
                        <button>Update</button>
                        <TransitionsModal open={open}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpen(false);
                            }}
                            className="absolute -top-[1rem] -right-[1rem] rounded-full bg-white"
                          >
                            <AiOutlineCloseCircle size={30} />
                          </button>
                          <NurseFormContent handleUpdate={handleUpdate} component={row} />
                        </TransitionsModal>
                      </div>
                    </TableCell>

                    <TableCell>
                      {row.Assign === 'No' && (
                        <div className="flex items-center justify-center">
                          <BasicSelect
                            input={room}
                            setInput={setRoom}
                            name={'Room'}
                            list={[...Object.keys(facilities)]}
                            style={{ width: 150, height: 50 }}
                            variant="filled"
                          />
                          <button
                            className="h-[3rem] rounded bg-blue-600 px-4 py-2 text-center text-white ring-2 ring-gray-300"
                            onClick={async () => {
                              await handleAssign(room, row);
                            }}
                          >
                            Assign
                          </button>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={async () => {
                          await handleDelete(row);
                        }}
                        className="flex items-center justify-center rounded-lg bg-auto-white px-4 py-2 text-black ring-2 ring-gray-300 hover:ring-black"
                      >
                        <AiOutlineCloseCircle /> <span>Remove</span>
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </>
  );
};

// export default MainContentCard;

const NurseFormContent = (props) => {
  return (
    <Formik
      validateOnChange={false}
      // validationSchema={props.schema}
      initialValues={{
        fname: props.component.Fname,
        lname: props.component.Lname,
        email: props.component.Email,
      }}
      onSubmit={(values) => {
        props.handleUpdate({ ...values }, props.component);
      }}
    >
      {({ values }) => (
        <Form>
          <div className="flex flex-col items-start justify-start">
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {`Update this Nurse with id ${props.component.N_Ssn}`}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {`Being assigned: ${props.component.Assign} `}
            </Typography>
            <div className={`mt-6`}>
              <Field
                name="fname"
                component={TextFormField}
                required
                id="fname-required"
                label={`Nurse First Name`}
                placeholder={`${props.component.Fname}`}
                helperText={`Please update the first name`}
              />
              <Field
                name="lname"
                component={TextFormField}
                required
                id="lname-required"
                label={`Nurse Last Name`}
                placeholder={`${props.component.Lname}`}
                helperText={`Please update the last name`}
              />
              <Field
                name="email"
                component={TextFormField}
                required
                id="email-required"
                label={`Nurse Email`}
                placeholder={`${props.component.Email}`}
                helperText={`Please update the nurse's email`}
              />
            </div>
            <button
              className="absolute bottom-[4.5rem] right-[4rem] rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-400  "
              type="submit"
            >
              Update
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
