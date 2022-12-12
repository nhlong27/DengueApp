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
import { ContentContainerContext } from '../../ContentContainer';
import BasicSelect from '@/shared/utilities/form/BasicSelect';
// import { LineChart } from './SingleLineChart';

const MainContent = (props) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [isPatient, setIsPatient] = useState({});
  const { devices } = useContext(ContentContainerContext);

  const handleLoad = async () => {
    try {
      setLoading(true);
      let { data: PATIENT, error } = await supabase.from('PATIENT').select('*');
      if (error) throw error;
      console.log('load patients success!');
      setContent(PATIENT);
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(async () => {
    handleLoad();
  }, [props.refresh]);

  let style1 = '';
  let style2 = '';
  if (isOpen) {
    style1 = '';
    style2 = 'w-[40%]';
  } else {
    style1 = '-mr-[64rem] opacity-0';
    style2 = 'w-[100%]';
  }
  if (!loading) {
    return (
      <div className="absolute h-screen w-[95%] rounded bg-gray-300 p-2">
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
        />
        <div
          className={` ${style1} absolute top-0 right-0 z-20 min-h-[50%] w-[100%]  rounded-l-lg bg-auto-white shadow-2xl ring-2 ring-black transition-all duration-500 ease-in-out`}
        >
          <div className=" flex w-[100%] flex-col items-center justify-start gap-4 p-4">
            <div className="flex w-[100%] flex-row items-center justify-start bg-auto-white text-large font-extrabold text-auto-black shadow-sm">
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
                <div className="col-span-1  grid h-[20rem] min-w-[15rem] grid-cols-2 grid-rows-5 gap-4 divide-y-2 divide-gray-400 rounded bg-auto-white p-4 ring-2 ring-gray-300">
                  <div className="col-span-2 row-span-4 flex flex-col items-center justify-between">
                    <div className="row-span-3 mt-4 h-[70%] w-[80%] rounded-full bg-gray-400">
                      Avatar
                    </div>
                    <div className="flex w-[30%] items-center justify-center">
                      <div className="text-[22px] font-semibold tracking-widest text-black"></div>
                      <div className="text-[22px] font-semibold tracking-widest text-black">
                        {isPatient.Fname}
                      </div>
                      <div className="text-[22px] font-semibold tracking-widest text-black">
                        {isPatient.Lname}
                      </div>
                    </div>
                  </div>
                  <button className="col-span-1 rounded bg-cyan-100 bg-opacity-5 p-4 text-base font-bold text-gray-400 transition-all duration-500 hover:bg-opacity-100 hover:text-gray-600  hover:ring-2 hover:ring-gray-200 focus:bg-cyan-200 focus:text-auto-black ">
                    Update
                  </button>
                  <button className="col-span-1 rounded bg-cyan-100 bg-opacity-5 p-4 text-base font-bold text-gray-400 transition-all duration-500 hover:bg-opacity-100 hover:text-gray-600  hover:ring-2 hover:ring-gray-200">
                    Delete
                  </button>
                </div>
                <div className="col-span-3 rounded ring-2 ring-gray-300">
                  <StatisticsCard
                    component={isPatient}
                    devices={devices
                      .filter((device) => device.Assign === 'No')
                      .map((device) => device.Label)}
                  />
                </div>
                <div className="col-span-3 rounded ring-2 ring-gray-300">
                  <div>
                    {/* <LineChart component={isPatient} /> */} 
                    <button onClick={()=>props.setIsChart(true)} className='p-4 ring-2 ring-gray-300 text-center'>Open Chart</button>
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center">
        <InfinitySpin width="300" color="#475569" />;
      </div>
    );
  }
};

const StatisticsCard = (props) => {
  const [device, setDevice] = useState('');
  const { telemetries } = useContext(ContentContainerContext);

  const handleAssign = async () => {
    try {
      let now = Date.now();
      const { data: DEVICE, error } = await supabase
        .from('DEVICE')
        .select('*')
        .eq('Label', device);
      await supabase
        .from('PATIENT')
        .update({ D_Id: DEVICE[0].D_Id })
        .eq('P_Ssn', props.component.P_Ssn);
      await supabase.from('DEVICE').update({ Assign: 'Yes' }).eq('D_Id', DEVICE[0].D_Id);
      // await supabase.from('TELEMETRY').insert([{ D_Id: DEVICE[0].D_Id, Time: now }]);
      if (error) throw error;
      console.log('assign device success!');
    } catch (error) {
      console.log(error.error_description || error.message);
    }
  };
  return (
    <Card sx={{ height: '100%', backgroundColor: '#F7F7FF' }}>
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
          <>
            <div className="mb-2 grid grid-cols-3 grid-rows-1 border-b-2 border-gray-300">
              {props.component.B_Number ? (
                <div className="col-span-1 text-green-300">
                  Assigned to bed: {props.component.B_Number}
                </div>
              ) : (
                <div className="col-span-1 text-red-300">Unassigned to any bed</div>
              )}
              {props.component.D_Id ? (
                <div className="col-span-2 text-green-300">
                  Device assigned: {props.component.D_Id}
                </div>
              ) : (
                <div className="col-span-2 flex justify-start text-red-300">
                  No assigned device
                  <BasicSelect
                    input={device}
                    setInput={setDevice}
                    name={'Assign a device'}
                    list={props.devices}
                    style={{ width: 150, height: 50 }}
                    variant="filled"
                  />
                  <button
                    className="rounded text-center text-blue-600 ring-2 ring-gray-300"
                    onClick={() => handleAssign()}
                  >
                    Assign
                  </button>
                </div>
              )}
            </div>
            <div className="mb-2 grid grid-cols-4 grid-rows-1 border-b-2 border-gray-300">
              <div>Sex: {props.component.Sex}</div>
              <div>Height: {props.component.Height}</div>
              <div>Weight: {props.component.Weight}</div>
              <div>Blood type: {props.component.BloodType}</div>
            </div>
            <div className="grid grid-cols-3 grid-rows-1 border-b-2 border-gray-300">
              <div>City: {props.component.City}</div>
              <div>District: {props.component.District}</div>
              <div>Street: {props.component.Street}</div>
            </div>
          </>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important',
          },
        }}
      />
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
                  {props.component.D_Id
                    ? telemetries[`${props.component.D_Id}`] &&
                      telemetries[`${props.component.D_Id}`].temperature
                    : 0}
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
                  {props.component.D_Id
                    ? telemetries[`${props.component.D_Id}`] &&
                      telemetries[`${props.component.D_Id}`].SpO2
                    : 0}
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
                  {props.component.D_Id
                    ? telemetries[`${props.component.D_Id}`] &&
                      telemetries[`${props.component.D_Id}`].HrtPressure
                    : 0}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MainContent;
