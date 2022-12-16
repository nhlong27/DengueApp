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

const MainContent = (props) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [isPatient, setIsPatient] = useState(null);
  const [devices] = useAtom(deviceList);
  const [facilities] = useAtom(facilityList);
  const [beds, setBeds] = useState(null);
  // const [statusList, setStatusList] = useState({});

  const listenUpdate = async () => {
    const PATIENT = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'PATIENT' },
        (payload) => {
          console.log('Change received!', payload);
          setIsUpdate((state) => !state);
        },
      )
      .subscribe();
  };

  const handleLoad = async (type = 'all') => {
    try {
      setLoading(true);
      let { data: PATIENT, error } = await supabase.from('PATIENT').select('*');
      if (error) throw error;
      console.log('load patients success!');
      console.log('PATIENT');
      let patients = {};
      patients.emergency = PATIENT.filter((patient) => patient.Status === 'Emergency');
      patients.all = [...patients.emergency];
      patients.febrile = PATIENT.filter((patient) => patient.Status === 'Febrile');
      patients.all = patients.all.concat(patients.febrile);
      patients.incubation = PATIENT.filter((patient) => patient.Status === 'Incubation');
      patients.all = patients.all.concat(patients.incubation);

      patients.recovery = PATIENT.filter((patient) => patient.Status === 'Recovery');
      patients.all = patients.all.concat(patients.recovery);

      patients.normal = PATIENT.filter((patient) => patient.Status === 'Normal');
      patients.all = patients.all.concat(patients.normal);

      patients.none = PATIENT.filter((patient) => patient.Status === 'None');
      patients.all = patients.all.concat(patients.none);

      console.log(patients);
      setContent(patients[`${type}`]);
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(async () => {
    await handleLoad();
  }, [props.refresh, isUpdate]);

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

  console.log('devices');
  console.log(devices);

  if (!loading) {
    return (
      <div className="absolute flex min-h-[92%] min-w-[95%] rounded-lg bg-gray-300 p-2">
        {/* <div
          className={`${style2} flex min-h-[99%] flex-col items-center justify-start gap-4 rounded-lg bg-gray-300 p-8 transition-all duration-700`}
        >
          {content.map((patient, index) => {
            return (
              <MainContentCard
                setInfoOpen={setOpen}
                open={isOpen}
              
                component={patient}
                setIsPatient={setIsPatient}
              />
            );
          })}
        </div> */}
        <DashboardTable
          rows={content}
          setInfoOpen={setOpen}
          open={isOpen}
          setIsPatient={setIsPatient}
          setIsUpdate={setIsUpdate}
          // statusList={statusList}
          // setStatusList={setStatusList}
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
                  <div className="col-span-2 row-span-4 flex flex-col items-center justify-between gap-2">
                    <div
                      className={`row-span-3 mt-4 h-[10rem] w-[80%] rounded-full bg-gray-400 ring-4 ring-offset-2 ${
                        (isPatient.Status === 'Incubation' &&
                          'ring-yellow-400') ||
                        (isPatient.Status === 'Febrile' &&
                          'ring-orange-400') ||
                        (isPatient.Status === 'Emergency' &&
                          'ring-red-400') ||
                        (isPatient.Status === 'Recovery' &&
                          'ring-green-400') ||
                        (isPatient.Status === 'None' &&
                          'ring-gray-400') ||
                        'ring-blue-400'
                      }`}
                    >
                      Avatar
                    </div>
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
                          (isPatient.Status === 'None' &&
                            'bg-gray-400 ring-gray-400') ||
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
                    <div className="w-[100%]">
                      <span className="font-bold text-blue-500">Email</span>:{' '}
                      {isPatient.Email}
                    </div>
                  </div>

                  <button className="col-span-1 rounded bg-auto-white p-4 text-base font-bold text-black ring-2 ring-gray-300 hover:ring-black ">
                    Update
                  </button>
                  <button className="col-span-1 rounded bg-auto-white p-4 text-base font-bold text-black ring-2 ring-gray-300 hover:ring-black">
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
                  />
                </div>
                {/* <div className="col-span-3 rounded ring-2 ring-gray-300">
                  <div>
                    
                    <button
                      onClick={() => {
                        props.setIsChart(() => ({
                          open: true,
                          type: 'all',
                          device: isPatient.D_Id,
                        }));
                      }}
                      className="p-4 text-center ring-2 ring-gray-300 hover:ring-black"
                    >
                      Open Chart
                    </button>
                  </div>
                </div> */}
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
            onClick={() => handleLoad('all')}
            className="height-[1rem] mr-[1rem] rounded-lg bg-gray-400 p-2 text-white ring-2 ring-black ring-offset-1 ring-offset-white hover:bg-gray-500"
          >
            All
          </button>
          <button
            onClick={() => handleLoad('emergency')}
            className="height-[1rem] mr-[1rem] rounded-lg bg-red-400 p-2 text-white ring-2 ring-black ring-offset-1 ring-offset-white hover:bg-red-500"
          >
            Emergency
          </button>
          <button
            onClick={() => handleLoad('febrile')}
            className="height-[1rem] mr-[1rem] rounded-lg bg-orange-400 p-2 text-white ring-2 ring-black ring-offset-1 ring-offset-white hover:bg-orange-500"
          >
            Febrile
          </button>
          <button
            onClick={() => handleLoad('incubation')}
            className="height-[1rem] mr-[1rem] rounded-lg bg-yellow-400 p-2 text-white ring-2 ring-black ring-offset-1 ring-offset-white hover:bg-yellow-500"
          >
            Incubation
          </button>
          <button
            onClick={() => handleLoad('recovery')}
            className="height-[1rem] mr-[1rem] rounded-lg bg-green-400 p-2 text-white ring-2 ring-black ring-offset-1 ring-offset-white hover:bg-green-500"
          >
            Recovery
          </button>
          <button
            onClick={() => handleLoad('normal')}
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
                <div>
                  <div className="mb-2 grid grid-cols-4 grid-rows-1 border-b-2 border-gray-300">
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
