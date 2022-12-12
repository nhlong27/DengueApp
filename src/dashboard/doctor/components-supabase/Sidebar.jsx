import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { TbBuildingHospital } from 'react-icons/tb';
import { RiNurseLine } from 'react-icons/ri';
import { TbDeviceWatch } from 'react-icons/tb';
import { MdOutlineSchedule } from 'react-icons/md';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { AiOutlineLeft } from 'react-icons/ai';
import { AiOutlineRight } from 'react-icons/ai';
import { MdScreenSearchDesktop } from 'react-icons/md';
import { Field, Form, Formik, setNestedObjectValues } from 'formik';
import { Typography } from '@mui/material';
import TransitionsModal from '@/shared/utilities/Modal';
import SelectFormField from '@/shared/utilities/form/SelectFormField';
import TextFormField from '@/shared/utilities/form/TextFormField';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const Sidebar = (props) => {
  const [isOpen, setOpen] = useState(false);
  const open = isOpen ? 'w-[15%]  rounded-r-lg' : 'w-[5%] my-4 rounded-2xl ml-4';
  const [isEmuOpen, setEmuOpen] = useState(false);

  return (
    <div
      className={`${open} relative flex min-w-[5rem] shrink-0 flex-col bg-black transition-all duration-500`}
    >
      <Link
        to="/pages/dashboard/doctor/index.html"
        className="mb-8 flex h-[10%] items-center justify-start p-4 text-large font-bold text-auto-white"
      >
        {isOpen ? (
          <>
            <img
              className="mr-4 h-[3rem] w-[3rem] transition-all duration-500"
              src="../../../../assets/img/mos_files/mos.png"
              alt="mos"
            />
            <span className="opacity-100 transition-opacity duration-500">DengueApp</span>
          </>
        ) : (
          <>
            <img
              className="h-[2.5rem] w-[2.5rem] transition-all duration-500"
              src="../../../../assets/img/mos_files/mos.png"
              alt="mos"
            />
            <span className="opacity-0 transition-opacity duration-500">DengueApp</span>
          </>
        )}
      </Link>

      {isOpen ? (
        <>
          <button
            onClick={() => setOpen((state) => !state)}
            className="absolute top-[5.3rem] -right-[1rem] flex w-[4rem] items-center justify-center rounded-full bg-blue-600 p-3"
          >
            <AiOutlineLeft color="white" size={20} />
          </button>
          <div className="ml-8 mr-12 border-t-2 border-auto-white p-4"></div>
          <div className="mr-2 flex flex-col gap-2 pb-8 ">
            <Link
              onClick={() => props.setLocation('Dashboard')}
              to="/pages/dashboard/doctor/index.html"
              className="duration-400 my-2 flex items-center justify-start py-2  px-8 text-[17px] tracking-wider text-auto-white transition-all hover:border-r-4  hover:border-auto-white hover:pl-12 hover:text-[19px] focus:border-r-4 focus:border-auto-white  focus:pl-12 focus:text-[17px] focus:text-auto-white "
            >
              <RxDashboard size={20} />
              <span className="mx-auto">Dashboard</span>
            </Link>
            <Link
              onClick={() => props.setLocation('Facilities')}
              to="/pages/dashboard/doctor/facilities"
              className="duration-400 my-2 flex items-center justify-start py-2  px-8 text-[17px] tracking-wider text-auto-white transition-all hover:border-r-4  hover:border-auto-white hover:pl-12 hover:text-[19px] focus:border-r-4 focus:border-auto-white  focus:pl-12 focus:text-[17px] focus:text-auto-white"
            >
              <TbBuildingHospital size={20} />
              <span className="mx-auto">Facilities</span>
            </Link>
            <Link
              onClick={() => props.setLocation('Nurses')}
              to="/pages/dashboard/doctor/nurses"
              className="duration-400 my-2 flex items-center justify-start py-2  px-8 text-[17px] tracking-wider text-auto-white transition-all hover:border-r-4  hover:border-auto-white hover:pl-12 hover:text-[19px] focus:border-r-4 focus:border-auto-white  focus:pl-12 focus:text-[17px] focus:text-auto-white"
            >
              <RiNurseLine size={22} />
              <span className="mx-auto">Nurses</span>
            </Link>
            <Link
              onClick={() => props.setLocation('Devices')}
              to="/pages/dashboard/doctor/devices"
              className="duration-400 my-2 flex items-center justify-start py-2  px-8 text-[17px] tracking-wider text-auto-white transition-all hover:border-r-4  hover:border-auto-white hover:pl-12 hover:text-[19px] focus:border-r-4 focus:border-auto-white  focus:pl-12 focus:text-[17px] focus:text-auto-white"
            >
              <TbDeviceWatch size={24} />
              <span className="mx-auto">Devices</span>
            </Link>
          </div>
          <div className="ml-8 mr-12 border-t-2 border-auto-white p-4"></div>
          <div className="mr-2 flex flex-col gap-2 pb-8">
            <div className="duration-400 my-2  flex items-center p-4  py-2 px-8 text-[17px] tracking-wider text-auto-white transition-all hover:border-r-4  hover:border-auto-white hover:pl-12 hover:text-[19px] focus:border-r-4 focus:border-auto-white  focus:pl-12 focus:text-[17px] focus:text-auto-white">
              <MdOutlineSchedule size={20} />
              <span className="mx-auto">Schedule</span>
            </div>
            <div className="duration-400 my-2 flex items-center p-4 py-2 px-8  text-[17px] tracking-wider text-auto-white transition-all hover:border-r-4  hover:border-auto-white hover:pl-12 hover:text-[19px] focus:border-r-4 focus:border-auto-white  focus:pl-12 focus:text-[17px] focus:text-auto-white">
              <IoMdNotificationsOutline size={24} />
              <span className="mx-auto">Notifs</span>
            </div>
            <div
              onClick={() => {
                setEmuOpen(true);
              }}
              className="duration-400 my-2 mt-12 flex items-center p-4 py-2 px-8  text-[17px] tracking-wider text-auto-white transition-all hover:border-r-4  hover:border-auto-white hover:pl-12 hover:text-[19px] focus:border-r-4 focus:border-auto-white  focus:pl-12 focus:text-[17px] focus:text-auto-white"
            >
              <MdScreenSearchDesktop size={24} />
              <span className="mx-auto">Emulator</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => setOpen((state) => !state)}
            className="absolute top-[5.3rem] -right-[1rem] flex w-[4rem] items-center justify-center rounded-full bg-blue-600 p-3"
          >
            <AiOutlineRight color="white" size={20} />
          </button>
          <div className="ml-[1.4rem] mr-12 border-t-2 border-auto-white p-4"></div>
          <div className="mr-0 flex flex-col gap-2 pb-8">
            <Link
              onClick={() => props.setLocation('Dashboard')}
              to="/pages/dashboard/doctor/index.html"
              className="duration-400 my-2 flex items-center justify-center py-2 text-[20px] tracking-wider text-auto-white transition-all hover:border-r-4  hover:border-auto-white  hover:text-[22px] focus:border-r-4 focus:border-auto-white   focus:text-[22px] focus:text-auto-white "
            >
              <RxDashboard size={23} />
              {/* <span className="hidden">Dashboard</span> */}
            </Link>
            <Link
              onClick={() => props.setLocation('Facilities')}
              to="/pages/dashboard/doctor/facilities"
              className="duration-400 my-2 flex items-center justify-center py-2   text-[20px] tracking-wider text-auto-white transition-all hover:border-r-4  hover:border-auto-white  hover:text-[22px] focus:border-r-4 focus:border-auto-white   focus:text-[22px] focus:text-auto-white"
            >
              <TbBuildingHospital size={24} />
              {/* <span className="hidden">Facilities</span> */}
            </Link>
            <Link
              onClick={() => props.setLocation('Nurses')}
              to="/pages/dashboard/doctor/nurses"
              className="duration-400 my-2 flex items-center justify-center py-2   text-[20px] tracking-wider text-auto-white transition-all hover:border-r-4  hover:border-auto-white  hover:text-[22px] focus:border-r-4 focus:border-auto-white   focus:text-[22px] focus:text-auto-white"
            >
              <RiNurseLine size={23} />
              {/* <span className="hidden">Nurses</span> */}
            </Link>
            <Link
              onClick={() => props.setLocation('Devices')}
              to="/pages/dashboard/doctor/devices"
              className="duration-400 my-2 flex items-center justify-center py-2   text-[20px] tracking-wider text-auto-white transition-all hover:border-r-4  hover:border-auto-white  hover:text-[22px] focus:border-r-4 focus:border-auto-white   focus:text-[22px] focus:text-auto-white"
            >
              <TbDeviceWatch size={25} />
              {/* <span className="hidden">Devices</span> */}
            </Link>
          </div>
          <div className="ml-[1.4rem] mr-12 border-t-2 border-auto-white p-4"></div>
          <div className="mr-0 flex flex-col gap-2 pb-8">
            <div className="duration-400 justify p-center  my-2 flex items-center justify-center py-2  text-[20px]  tracking-wider text-auto-white transition-all hover:border-r-4  hover:border-auto-white  hover:text-[22px] focus:border-r-4 focus:border-auto-white   focus:text-[22px] focus:text-auto-white">
              <MdOutlineSchedule size={25} />
              {/* <span className="hidden">Schedule</span> */}
            </div>
            <div className="duration-400 p-center my-2 flex items-center justify-center py-2  text-[20px] tracking-wider text-auto-white transition-all hover:border-r-4  hover:border-auto-white  hover:text-[22px] focus:border-r-4 focus:border-auto-white   focus:text-[22px] focus:text-auto-white">
              <IoMdNotificationsOutline size={25} />
              {/* <span className="hidden">Notifs</span> */}
            </div>
            <div
              onClick={() => {
                setEmuOpen(true);
              }}
              className="duration-400 p-center my-2 mt-8 flex items-center justify-center py-2  text-[20px] tracking-wider text-auto-white transition-all hover:border-r-4  hover:border-auto-white  hover:text-[22px] focus:border-r-4 focus:border-auto-white   focus:text-[22px] focus:text-auto-white"
            >
              <MdScreenSearchDesktop size={25} />
            </div>
          </div>
        </>
      )}
      <TransitionsModal open={isEmuOpen}>
        <button
          onClick={() => setEmuOpen(false)}
          className="absolute -top-[1rem] -right-[1rem] rounded-full bg-white"
        >
          <AiOutlineCloseCircle size={30} />
        </button>
        <FacilityFormContent
          // schema={device_schema}
          handleSubmit={() => setEmuOpen(false)}
        />
      </TransitionsModal>
    </div>
  );
};

const FacilityFormContent = (props) => {
  return (
    <Formik
      validateOnChange={false}
      // validationSchema={props.schema}
      initialValues={{
        deviceId: '',
        accessToken: '',
        addDate: '',
      }}
      onSubmit={(values) => {
        console.log('for later');
        props.handleSubmit();
      }}
    >
      {({ values }) => (
        <Form>
          <div className="flex flex-col items-start justify-start">
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Device emulator
            </Typography>
            <div className={`mt-6`}>
              <Field
                name="deviceId"
                component={TextFormField}
                required
                id="id-required"
                label={`Device Id`}
              />
              <Field
                name="accessToken"
                component={TextFormField}
                id="token-required"
                label={`Access Token`}
              />
              <Field
                name="addDate"
                component={TextFormField}
                id="date"
                label={`Simulated date`}
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
                Change
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Sidebar;
