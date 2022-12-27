import React, { useState, useEffect, useContext } from 'react';
import { DashboardTable } from './MainContentCard';
import { InfinitySpin } from 'react-loader-spinner';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { AiOutlineLeft } from 'react-icons/ai';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { BsPeopleFill } from 'react-icons/bs';
import { TbTemperatureCelsius } from 'react-icons/tb';
import { GiMedicalDrip } from 'react-icons/gi';
import { BiHeart } from 'react-icons/bi';
import { GrDevice } from 'react-icons/gr';
import { useAtom, Provider } from 'jotai';
import BasicSelect from '@/shared/utilities/form/BasicSelect';
import { deviceList, telemetries, facilityList } from '@/dashboard/doctor/App';
import { AiOutlineAreaChart } from 'react-icons/ai';
import { Field, Form, Formik } from 'formik';
import TextFormField from '@/shared/utilities/form/TextFormField';
import { userSession } from '@/dashboard/Auth';
import PatientAvatar from './PatientAvatar';
import { patientList } from '@/dashboard/doctor/App';

const MainContent = (props) => {
  const [content, setContent] = useAtom(patientList);
  const [loading, setLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [isPatient, setIsPatient] = useState(null);
  const [devices] = useAtom(deviceList);
  const [facilities] = useAtom(facilityList);
  const [openUpdate, setOpenUpdate] = useState(false);
  // const [statusList, setStatusList] = useState({});

  const [session] = useAtom(userSession)

  const listenUpdate = async () => {
    const PATIENT = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'PATIENT' },
        (payload) => {
          console.log('Patient received!', payload);
          props.handleLoadPatient();
        },
      )
      .subscribe();
  };


  const handleDelete = async (patient) => {
    try {
      setLoading(true);
      await supabase.from('DEVICE').update({ Assign: 'No' }).eq('D_Id', patient.D_Id);
      await supabase
        .from('BED')
        .update({ Assign: 'No' })
        .eq('B_Number', patient.B_Number);

      const { error } = await supabase
        .from('PATIENT')
        .delete()
        .eq('P_Ssn', patient.P_Ssn);

      console.log('delete patient success!');
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const handleUpdate = async (values, patient) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('PATIENT')
        .update({
          Age: values.age,
          Sex: values.sex,
          Height: values.height,
          Weight: values.weight,
          BloodType: values.bloodtype,
          City: values.city,
          District: values.district,
          Street: values.street,
        })
        .eq('P_Ssn', patient.P_Ssn);
      if (error) throw error;
      console.log('update patient success!');
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };


  useEffect(() => {
    listenUpdate();
  }, []);

  let style1 = '';
  let style2 = '';
  let styleSort = '';
  if (isOpen) {
    style1 = '';
    style2 = 'w-[40%]';
    styleSort = '-mt-[32rem] opacity-0';
  } else {
    style1 = '-mr-[64rem] opacity-0';
    style2 = 'w-[100%]';
    styleSort = '';
  }

  if (!loading) {
    return (
      <div className="absolute flex min-h-[92%] min-w-[95%] rounded-lg bg-gray-300 p-2">
        <DashboardTable
          rows={content}
          setInfoOpen={setOpen}
          open={isOpen}
          setIsPatient={setIsPatient}
          handleLoadPatient={props.handleLoadPatient}
        />
        <div
          className={` ${style1} absolute top-0 right-0 min-h-[100%] w-[100%]  rounded-l-lg bg-gray-200 shadow-2xl ring-2 ring-black transition-all duration-500 ease-in-out`}
        >
          <div className=" flex w-[100%] flex-col items-center justify-start gap-4 p-4">
            <div className="flex w-[100%] flex-row items-center justify-start rounded-lg bg-auto-white text-large font-extrabold text-auto-black shadow-sm ring-2 ring-gray-300">
              <button
                onClick={() => {
                  setOpen(false);
                }}
                className="rounded p-2 font-bold  "
              >
                <AiOutlineLeft className="hover:text-gray-300" color="black" size={30} />
              </button>
              <span>Patient Details</span>
            </div>
            {isPatient && (
              <div className="grid w-[100%] grid-cols-4 gap-8">
                <div className="col-span-1  grid min-h-[20rem] min-w-[15rem] grid-cols-2 grid-rows-5 gap-4 rounded bg-auto-white p-4 ring-2 ring-gray-300">
                  <div className="relative col-span-2 row-span-4 flex flex-col items-center justify-between gap-2">
                    <PatientAvatar isPatient={isPatient}/>
                    <div className="flex w-[100%] items-center justify-between">
                      <div
                        className={`h-[1rem] w-[1rem] rounded-full ring-2 ring-offset-2 ${
                          (isPatient.Status === 'Incubation' &&
                            'bg-yellow-400 ring-yellow-400') ||
                          (isPatient.Status === 'Febrile' &&
                            'bg-orange-400 ring-orange-400') ||
                          (isPatient.Status === 'Emergency' &&
                            'bg-red-400 ring-red-400') ||
                          (isPatient.Status === 'Recovery' &&
                            'bg-green-400 ring-green-400') ||
                          (isPatient.Status === 'None' && 'bg-gray-400 ring-gray-400') ||
                          'bg-blue-400 ring-blue-400'
                        }`}
                      ></div>
                      <div className="text-[22px] font-semibold tracking-widest text-black">
                        {isPatient.Fname}
                      </div>
                      <div className="ml-2 text-[22px] font-semibold tracking-widest text-black">
                        {isPatient.Lname}
                      </div>
                    </div>
                    <div className="w-[100%] overflow-hidden">
                      <span className="font-bold text-blue-500">Email</span>:{' '}
                      {isPatient.Email}
                    </div>
                  </div>
                  {openUpdate ? (
                    <button
                      onClick={() => setOpenUpdate(false)}
                      className="col-span-1 rounded bg-black p-4 text-base font-bold text-white opacity-50 ring-2 ring-black ring-offset-1 ring-offset-white hover:opacity-100 "
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setOpenUpdate(true);
                      }}
                      className="col-span-1 rounded bg-auto-white p-4 text-base font-bold text-black ring-2 ring-gray-300 hover:ring-black "
                    >
                      Update
                    </button>
                  )}
                  <button
                    onClick={() => {
                      handleDelete(isPatient);
                    }}
                    className="col-span-1 rounded bg-auto-white p-4 text-base font-bold text-black ring-2 ring-gray-300 hover:ring-black"
                  >
                    Delete
                  </button>
                </div>
                <div className="col-span-3 rounded ring-2 ring-gray-300">
                  <StatisticsCard
                    component={isPatient}
                    devices={devices
                      .filter((device) => device.Assign === 'No')
                      .map((device) => device.Label)}
                    setIsChart={props.setIsChart}
                    facilities={facilities}
                    setOpen={setOpen}
                    openUpdate={openUpdate}
                    setOpenUpdate={setOpenUpdate}
                    handleUpdate={handleUpdate}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className={`${styleSort} transition-full absolute left-0 -top-[1rem] flex w-[100%] flex-row items-center justify-start duration-700`}
        >
          <div className="mr-[1rem] mb-4 rounded-lg font-extrabold tracking-wider text-black">
            Sort by
          </div>
          <button
            onClick={() => props.handleLoadPatient('all')}
            className="height-[1rem] mr-[1rem] rounded-lg bg-gray-400 p-2 text-white ring-2 ring-black ring-offset-1 ring-offset-white hover:bg-gray-500"
          >
            All
          </button>
          <button
            onClick={() => props.handleLoadPatient('emergency')}
            className="height-[1rem] mr-[1rem] rounded-lg bg-red-400 p-2 text-white ring-2 ring-black ring-offset-1 ring-offset-white hover:bg-red-500"
          >
            Emergency
          </button>
          <button
            onClick={() => props.handleLoadPatient('febrile')}
            className="height-[1rem] mr-[1rem] rounded-lg bg-orange-400 p-2 text-white ring-2 ring-black ring-offset-1 ring-offset-white hover:bg-orange-500"
          >
            Febrile
          </button>
          <button
            onClick={() => props.handleLoadPatient('incubation')}
            className="height-[1rem] mr-[1rem] rounded-lg bg-yellow-400 p-2 text-white ring-2 ring-black ring-offset-1 ring-offset-white hover:bg-yellow-500"
          >
            Incubation
          </button>
          <button
            onClick={() => props.handleLoadPatient('recovery')}
            className="height-[1rem] mr-[1rem] rounded-lg bg-green-400 p-2 text-white ring-2 ring-black ring-offset-1 ring-offset-white hover:bg-green-500"
          >
            Recovery
          </button>
          <button
            onClick={() => props.handleLoadPatient('normal')}
            className="height-[1rem] mr-[1rem] rounded-lg bg-blue-400 p-2 text-white ring-2 ring-black ring-offset-1 ring-offset-white hover:bg-blue-500"
          >
            Normal
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center">
        <InfinitySpin width="300" color="#475569" />
      </div>
    );
  }
};

const StatisticsCard = (props) => {
  const [device, setDevice] = useState('');
  const [room, setRoom] = useState(null);
  const [bed, setBed] = useState(null);
  const [age, setAge] = useState(props.component.Age);
  const [sex, setSex] = useState(props.component.Sex);
  const [bloodtype, setBloodtype] = useState(props.component.BloodType);
  const [city, setCity] = useState(props.component.City);
  const [district, setDistrict] = useState(props.component.District);
  const [tele] = useAtom(telemetries);

  const [currTele] =
    props.component && tele[`${props.component.D_Id}`]
      ? useAtom(tele[`${props.component.D_Id}`])
      : useAtom(tele.something);

  const handleAssignDevice = async () => {
    try {
      const { data: DEVICE, error } = await supabase
        .from('DEVICE')
        .select('*')
        .eq('Label', device)
        .single();
      await supabase
        .from('PATIENT')
        .update({ D_Id: DEVICE.D_Id, D_Label: DEVICE.Label })
        .eq('P_Ssn', props.component.P_Ssn);
      await supabase
        .from('DEVICE')
        .update({ Assign: props.component.Fname })
        .eq('D_Id', DEVICE.D_Id);
      if (error) throw error;
      console.log('assign device success!');
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      props.setOpen((state) => !state);
    }
  };

  const handleAssignBed = async () => {
    try {
      await supabase
        .from('PATIENT')
        .update({ B_Number: bed })
        .eq('P_Ssn', props.component.P_Ssn);
      await supabase
        .from('BED')
        .update({ Assign: props.component.Fname })
        .eq('B_Number', bed);
      // await supabase.from('TELEMETRY').insert([{ D_Id: DEVICE[0].D_Id, Time: now }]);
      if (error) throw error;
      console.log('assign bed success!');
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      props.setOpen((state) => !state);
    }
  };

  return (
    <Card sx={{ height: '100%', backgroundColor: '#F7F7FF' }}>
      <div className="flex h-[100%] flex-col justify-between">
        <div className="h-[70%]">
          <CardHeader
            title="Live Status"
            action={
              <IconButton
                size="small"
                aria-label="settings"
                className="card-more-options"
                sx={{ color: 'text.secondary' }}
              >
                <BsPeopleFill />
              </IconButton>
            }
            subheader={
              <div className="flex h-[8rem] flex-col justify-between">
                <div className="flex justify-between border-b-2 border-gray-300">
                  {props.component.B_Number ? (
                    <div className="col-span-1 text-green-300">
                      <span className="font-bold">Bed assigned:</span>{' '}
                      {props.component.B_Number}
                    </div>
                  ) : (
                    <div className="flex items-center justify-start text-red-300">
                      <BasicSelect
                        input={room}
                        setInput={setRoom}
                        name={'Room'}
                        list={[...Object.keys(props.facilities)]}
                        style={{ width: 150, height: 50 }}
                        variant="filled"
                      />

                      {room ? (
                        <>
                          <BasicSelect
                            input={bed}
                            setInput={setBed}
                            name={'Bed'}
                            list={props.facilities[`${room}`].beds
                              .filter((bed) => bed.Assign === 'No')
                              .map((bed) => bed.B_Number)}
                            style={{ width: 150, height: 50 }}
                            variant="filled"
                          />
                          <button
                            className="h-[3rem] rounded bg-blue-600 px-4 py-2 text-center text-white ring-2 ring-gray-300"
                            onClick={() => handleAssignBed()}
                          >
                            Assign
                          </button>
                        </>
                      ) : null}
                    </div>
                  )}
                  {props.component.D_Id ? (
                    <div className=" text-green-300">
                      <span className="font-bold">Device assigned:</span>{' '}
                      {props.component.D_Label}
                    </div>
                  ) : (
                    <div className=" flex items-center justify-start text-red-300">
                      <BasicSelect
                        input={device}
                        setInput={setDevice}
                        name={'Assign a device'}
                        list={props.devices}
                        style={{ width: 150, height: 50 }}
                        variant="filled"
                      />
                      <button
                        className="h-[3rem] rounded bg-blue-600 px-4 py-2 text-center text-white ring-2 ring-gray-300"
                        onClick={() => handleAssignDevice()}
                      >
                        Assign
                      </button>
                    </div>
                  )}
                </div>
                {props.openUpdate ? (
                  <Formik
                    validateOnChange={false}
                    initialValues={{
                      age: age,
                      sex: sex,
                      height: props.component.Height,
                      weight: props.component.weight,
                      city: city,
                      district: district,
                      street: props.component.Street,
                      bloodtype: bloodtype,
                    }}
                    onSubmit={(values) => {
                      props.handleUpdate(
                        {
                          ...values,
                          age: age,
                          sex: sex,
                          city: city,
                          district: district,
                          bloodtype: bloodtype,
                        },
                        props.component,
                      );
                      props.setOpenUpdate(false);
                    }}
                  >
                    {({ values }) => (
                      <Form>
                        <div className="flex flex-col items-start justify-start">
                          <div className="mb-2 grid grid-cols-5 grid-rows-1 border-b-2 border-gray-300">
                            <BasicSelect
                              input={age}
                              setInput={setAge}
                              name={'Age'}
                              list={[
                                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                                17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                                31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44,
                                45, 46, 47, 48, 49, 50,
                              ]}
                              style={{ width: 80, height: '2rem' }}
                            />
                            <BasicSelect
                              input={sex}
                              setInput={setSex}
                              name={'Sex'}
                              list={['male', 'female', 'others']}
                              style={{ width: 100, height: '2rem' }}
                            />
                            <Field
                              name="height"
                              component={TextFormField}
                              placeholder={values.height}
                              value={values.height}
                              label={`Height (In cm)`}
                              style={{
                                display: 'absolute',
                                width: 80,
                                height: 10,
                                top: '-1.5rem',
                              }}
                              variant="filled"
                            />
                            <Field
                              name="weight"
                              component={TextFormField}
                              placeholder={values.weight}
                              label={`Weight (In kg)`}
                              style={{
                                display: 'absolute',
                                width: 80,
                                height: 10,
                                top: '-1.5rem',
                              }}
                              variant="filled"
                            />
                            <BasicSelect
                              input={bloodtype}
                              setInput={setBloodtype}
                              name={'Blood Type'}
                              list={['O+', 'O-', 'A+', 'A-', 'B+', 'B+', 'AB+', 'AB+']}
                              style={{ width: 80, height: '2rem' }}
                            />
                          </div>
                          <div className="grid grid-cols-4 grid-rows-1 border-b-2 border-gray-300">
                            <BasicSelect
                              input={city}
                              setInput={setCity}
                              name={'City'}
                              list={['HCMC', 'Hanoi', 'Danang']}
                              style={{ width: 130, height: '2rem' }}
                            />
                            <BasicSelect
                              input={district}
                              setInput={setDistrict}
                              name={'District'}
                              list={['District 1', 'Go Vap District', 'District 7']}
                              style={{ width: 130, height: '2rem' }}
                            />
                            <Field
                              name="street"
                              component={TextFormField}
                              label={`Street address`}
                              placeholder={values.street}
                              style={{
                                display: 'absolute',
                                width: 200,
                                height: 10,
                                top: '-1.5rem',
                              }}
                              variant="filled"
                            />
                            <button
                              className="ml-12 h-[3rem] w-[100px] rounded bg-blue-600 px-2 py-2 text-center text-white ring-2 ring-gray-300 hover:bg-blue-700 hover:ring-black"
                              type="submit"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                ) : (
                  <div>
                    <div className="mb-2 grid grid-cols-5 grid-rows-1 border-b-2 border-gray-300">
                      <div>
                        {' '}
                        <span className="font-bold text-blue-400">Age</span> :{' '}
                        {props.component.Age}
                      </div>
                      <div>
                        {' '}
                        <span className="font-bold text-blue-400">Sex</span> :{' '}
                        {props.component.Sex}
                      </div>
                      <div>
                        {' '}
                        <span className="font-bold text-blue-400">Height</span> :{' '}
                        {props.component.Height}
                      </div>
                      <div>
                        {' '}
                        <span className="font-bold text-blue-400">Weight</span> :{' '}
                        {props.component.Weight}
                      </div>
                      <div>
                        {' '}
                        <span className="font-bold text-blue-400">Blood type</span> :{' '}
                        {props.component.BloodType}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 grid-rows-1 border-b-2 border-gray-300">
                      <div>
                        {' '}
                        <span className="font-bold text-blue-400">City</span> :{' '}
                        {props.component.City}
                      </div>
                      <div>
                        {' '}
                        <span className="font-bold text-blue-400">District</span> :{' '}
                        {props.component.District}
                      </div>
                      <div>
                        {' '}
                        <span className="font-bold text-blue-400">Street</span> :{' '}
                        {props.component.Street}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            }
            titleTypographyProps={{
              sx: {
                mb: 2.5,
                lineHeight: '2rem !important',
                letterSpacing: '0.15px !important',
              },
            }}
          />
        </div>
        <div>
          <CardContent
            sx={{ pt: (theme) => `${theme.spacing(3)} !important`, height: '100%' }}
          >
            <Grid
              container
              spacing={[5, 0]}
              sx={{ width: '100%', gap: 5, display: 'flex', alignItems: 'center' }}
            >
              <Grid item xs={12} sm={3} sx={{ height: '100%', borderRadius: '25px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    variant="rounded"
                    sx={{
                      mr: 3,
                      width: 70,
                      height: 70,
                      boxShadow: 3,
                      color: 'common.white',
                      backgroundColor: `warning.main`,
                    }}
                  >
                    <TbTemperatureCelsius size={40} />
                  </Avatar>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="caption" sx={{ fontSize: 16, color: '#b85b1a' }}>
                      Temperature
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'warning.main', fontSize: 50 }}>
                      {props.component.D_Id ? currTele && currTele.temperature : 0}
                      {/* {props.component.D_Id
                    ? telemetries[`${props.component.D_Id}`] &&
                      telemetries[`${props.component.D_Id}`].temperature
                    : 0} */}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={3} sx={{ height: '100%', borderRadius: '25px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    variant="rounded"
                    sx={{
                      mr: 3,
                      width: 70,
                      height: 70,
                      boxShadow: 3,
                      color: 'common.white',
                      backgroundColor: `info.main`,
                    }}
                  >
                    <GiMedicalDrip size={40} />
                  </Avatar>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="caption" sx={{ fontSize: 16, color: '#062670' }}>
                      SpO2
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: 50, color: 'info.main' }}>
                      {props.component.D_Id ? currTele && currTele.SpO2 : 0}
                      {/* {props.component.D_Id
                    ? telemetries[`${props.component.D_Id}`] &&
                      telemetries[`${props.component.D_Id}`].SpO2
                    : 0} */}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={3} sx={{ height: '100%', borderRadius: '25px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    variant="rounded"
                    sx={{
                      mr: 3,
                      width: 70,
                      height: 70,
                      boxShadow: 3,
                      color: 'common.white',
                      backgroundColor: `#7C3AED`,
                    }}
                  >
                    <BiHeart size={40} />
                  </Avatar>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant="caption"
                      sx={{ width: 100, fontSize: 16, color: '#350961' }}
                    >
                      Heart Rate
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: 50, color: '#7C3AED' }}>
                      {props.component.D_Id ? currTele && currTele.HrtPressure : 0}
                      {/* {props.component.D_Id
                    ? telemetries[`${props.component.D_Id}`] &&
                      telemetries[`${props.component.D_Id}`].HrtPressure
                    : 0} */}
                    </Typography>
                  </Box>
                  <button
                    onClick={() => {
                      props.setIsChart(() => ({
                        open: true,
                        type: 'all',
                        device: props.component.D_Id,
                      }));
                    }}
                    className=" rounded-lg bg-blue-600 p-2 text-center text-white ring-2 ring-gray-300 hover:ring-black"
                  >
                    <AiOutlineAreaChart color="#FFFFFF" />
                    <span>Charts</span>
                  </button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default MainContent;
