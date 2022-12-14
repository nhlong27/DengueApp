import { client } from '@/shared/api/initClient_tenant';
import React, { useContext, useEffect, useState } from 'react';
import { MySocket } from '../../Socket';
import TimeSeries from '../../TimeSeries';
import { TbTemperatureCelsius } from 'react-icons/tb';
import { GiMedicalDrip } from 'react-icons/gi';
import { BiHeart } from 'react-icons/bi';
import { GrDevice } from 'react-icons/gr';
// import { telemetries, handleTelemetry } from '../../ContentContainer';
// import { ContentContainerContext } from '../../ContentContainer';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Field, Form, Formik, setNestedObjectValues } from 'formik';
import { Typography } from '@mui/material';
import TransitionsModal from '@/shared/utilities/Modal';
import SelectFormField from '@/shared/utilities/form/SelectFormField';
import TextFormField from '@/shared/utilities/form/TextFormField';
import { InfinitySpin } from 'react-loader-spinner';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { telemetries } from '@/dashboard/doctor/App';
import { useAtom } from 'jotai';

// const now = Date.now();
// const mtd = now - 3600000;

const MainContentCard = (
  { infoOpen, component, setInfoOpen, setIsDevice } = {
    infoOpen: null,
    component: '',
    setInfoopen: null,
    setIsDevice: null,
  },
) => {
  // const [close, setClose] = useState(false)
  // const [change, setChange] = useState(false)
  // const { telemetries } = useContext(ContentContainerContext);
  const [tele] = useAtom(telemetries);
  // console.log('in device maincontentcard');
  // console.log(tele);
  // console.log(component.D_Id);
  // console.log(tele[`${component.D_Id}`]);

  const [currTele] = tele[`${component.D_Id}`]
    ? useAtom(tele[`${component.D_Id}`])
    : useAtom(tele.something);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleUpdate = async (values) => {
    try {
      //Setting device and access token on thingsboard
      setLoading(true);
      const success = await client.connect();
      if (success) {
        let device = await client.createUpdateDevice({
          id: {
            id: component.D_Id,
            entityType: 'DEVICE',
          },
          name: values.label,
          type: values.type,
          label: values.label,
          // deviceProfileId: {
          //   id: '3e29a7f0-750f-11ed-81cb-3bc720ab387f',
          //   entityType: 'DEVICE_PROFILE',
          // },
          additionalInfo: {},
        });

        // Add device to db
        await supabase
          .from('DEVICE')
          .update({
            Label: values.label,
            Type: values.type,
          })
          .eq('D_Id', component.D_Id);
      }
      if (error) throw error;
      console.log('update device success!');
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleDelete = async (values) => {
    try {
      //Setting device and access token on thingsboard
      setLoadingDelete(true);
      const success = await client.connect();
      if (success) {
        let device = await client.deleteDevice(component.D_Id);

        // delete device from db
        await supabase
          .from('PATIENT')
          .update({
            D_Id: null,
          })
          .eq('D_Id', component.D_Id);

        await supabase.from('DEVICE').delete().eq('D_Id', component.D_Id);
      }
      if (error) throw error;
      console.log('delete device success!');
    } catch (error) {
      console.log(error.error_description || error.message);
    }
  };
  // useEffect(() => {
  // openSocket();
  // }, []);
  // const [isOpenTimeSeries, setOpenTimeSeries] = useState(false);
  return (
    <div className="grid w-[100%] grid-cols-3 gap-4 divide-y-2 divide-gray-400 rounded-lg bg-auto-white p-4 shadow-lg ring-2 ring-black transition-all duration-300 ease-in-out">
      {loadingDelete ? (
        <div className="w=[100%] flex h-[100%] items-center justify-center text-red-400">
          <div>
            Device {component.Label} with access token {component.Token} has been removed
          </div>
        </div>
      ) : (
        <>
          <div className="col-span-3 flex items-center justify-start">
            {infoOpen ? (
              <>
                <div className="flex w-[30%] flex-col items-start justify-start">
                  <div className="relative px-4 text-[22px] font-semibold tracking-widest text-black">
                    <GrDevice />
                    {/* {currTele &&
                    currTele.connected ? (
                      <div className="absolute top-0 -right-[4rem] text-[14px] text-green-500">
                        Connected
                      </div>
                    ) : (
                      <div className="absolute top-0 -right-[4rem] text-[14px] text-red-500">
                        Disconnected
                      </div>
                    )} */}

                    {component.Label}
                  </div>
                </div>
                <div className="ml-auto flex h-[100%] w-[100%] items-center justify-center gap-[1.8rem]">
                  <div className="flex h-[100%] w-[20%] flex-col items-center justify-center">
                    <div className="">
                      <TbTemperatureCelsius size={40} color="blue" />{' '}
                    </div>
                    <div className="text-[20px] font-extrabold tracking-[5px] text-purple-600">
                      {currTele && currTele.temperature}
                      {/* {currTele &&
                        currTele.temperature} */}
                    </div>
                  </div>
                  <div className="flex h-[100%] w-[20%] flex-col items-center justify-center">
                    <div className="">
                      <GiMedicalDrip size={40} color="blue" />
                    </div>
                    <div className="text-[20px] font-extrabold tracking-[5px] text-cyan-600">
                      {currTele && currTele.SpO2}
                    </div>
                  </div>
                  <div className="flex h-[100%] w-[20%] flex-col items-center justify-center">
                    <div className="">
                      <BiHeart size={40} color="blue" />
                    </div>
                    <div className="text-[20px] font-extrabold tracking-[5px] text-yellow-600">
                      {currTele && currTele.HrtPressure}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex w-[30%] flex-col items-start justify-start">
                  <div className="relative px-4 text-[22px] font-semibold tracking-widest text-black">
                    <GrDevice />
                    {currTele && currTele.connected ? (
                      <div className="absolute top-0 -right-[4rem] text-[14px] text-green-500">
                        Connected
                      </div>
                    ) : (
                      <div className="absolute top-0 -right-[4rem] text-[14px] text-red-500">
                        Disconnected
                      </div>
                    )}

                    {component.Label}
                  </div>
                  <div className="px-4 text-[16px] font-semibold text-blue-600">
                    {component.Type}
                  </div>
                  {component.Assign === 'No' ? (
                    <div className="px-4 text-[14px] font-bold text-gray-400">
                      Assigned: {component.Assign}
                    </div>
                  ) : (
                    <div className="px-4 text-[14px] font-bold text-red-400">
                      Assigned: {component.Assign}
                    </div>
                  )}
                </div>
                <div className="ml-auto flex h-[100%] w-[100%] items-center justify-center gap-[5rem]">
                  <div className="flex h-[100%] w-[20%] flex-col items-center  justify-between p-2">
                    <div className="">
                      <TbTemperatureCelsius size={40} color="blue" />
                    </div>
                    <div className="text-[40px] font-extrabold tracking-[5px] text-orange-400">
                      {currTele && currTele.temperature}
                    </div>
                  </div>
                  <div className="flex h-[100%] w-[20%] flex-col items-center justify-between p-2">
                    <div className="">
                      <GiMedicalDrip size={40} color="blue" />
                    </div>
                    <div className="text-[40px] font-extrabold tracking-[5px] text-blue-400">
                      {currTele && currTele.SpO2}
                    </div>
                  </div>
                  <div className="flex h-[100%] w-[20%] flex-col items-center justify-between p-2">
                    <div className="">
                      <BiHeart size={40} color="blue" />
                    </div>
                    <div className="text-[40px] font-extrabold tracking-[5px] text-purple-400">
                      {currTele && currTele.HrtPressure}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <button
            onClick={() => {
              setInfoOpen(true);
              setIsDevice(component);
            }}
            className="col-span-1 rounded bg-auto-white bg-opacity-5 p-4 text-base font-bold text-gray-400 transition-all duration-500 hover:bg-opacity-100 hover:text-gray-600  hover:ring-2 hover:ring-gray-200 focus:bg-cyan-200 focus:text-auto-black "
          >
            Details
          </button>
          <div
            onClick={() => setOpen(true)}
            className="col-span-1 flex items-center justify-center rounded bg-auto-white bg-opacity-5 p-4 text-base font-bold text-gray-400 transition-all duration-500 hover:bg-opacity-100 hover:text-gray-600  hover:ring-2 hover:ring-gray-200"
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
              <FacilityFormContent
                // schema={device_schema}
                handleUpdate={handleUpdate}
                loading={loading}
                component={component}
              />
            </TransitionsModal>
          </div>
          <button
            onClick={() => {
              handleDelete();
            }}
            className="col-span-1 rounded bg-auto-white bg-opacity-5 p-4 text-base font-bold text-gray-400 transition-all duration-500 hover:bg-opacity-100 hover:text-gray-600  hover:ring-2 hover:ring-gray-200"
          >
            Remove
          </button>
        </>
      )}
    </div>
  );
};

const FacilityFormContent = (props) => {
  return (
    <Formik
      validateOnChange={false}
      // validationSchema={props.schema}
      initialValues={{
        label: props.component.Label,
        type: props.component.Type,
      }}
      onSubmit={(values) => {
        props.handleUpdate({ ...values });
      }}
    >
      {({ values }) => (
        <Form>
          <div className="flex flex-col items-start justify-start">
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {`Update this device with access token ${props.component.Token}`}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {`Please note that access token cannot be updated. Being assigned:${props.component.Assign} `}
            </Typography>
            <div className={`mt-6`}>
              <Field
                name="label"
                component={TextFormField}
                required
                id="label-required"
                label={`Device Name`}
                placeholder={`${props.component.Label}`}
                helperText={`Please update the name of your device`}
              />
              <Field
                name="type"
                component={TextFormField}
                required
                id="type-required"
                label={`Device Type`}
                placeholder={`${props.component.Type}`}
                helperText={`Please update the type of your device`}
              />
            </div>

            {props.loading ? (
              <div className="absolute bottom-[2rem] right-[3rem]">
                <InfinitySpin width="300" color="#475569" />
              </div>
            ) : (
              <button
                className="absolute bottom-[4.5rem] right-[4rem] rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-400  "
                type="submit"
              >
                Update
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MainContentCard;
