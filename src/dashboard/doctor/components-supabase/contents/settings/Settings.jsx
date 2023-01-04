import React, { useState, useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { Typography } from '@mui/material';
import TransitionsModal from '@/shared/utilities/Modal';
import SelectFormField from '@/shared/utilities/form/SelectFormField';
import TextFormField from '@/shared/utilities/form/TextFormField';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { MdScreenSearchDesktop } from 'react-icons/md';
import BasicSelect from '@/shared/utilities/form/BasicSelect';
import { supabase } from '@/shared/api/supabase/supabaseClient';

import { ExcelRenderer, OutTable } from 'react-excel-renderer';
import { useAtom } from 'jotai';
import { patientList } from '@/dashboard/doctor/App';
import { userSession } from '@/dashboard/Auth';

const Settings = () => {
  const [patients, setPatients] = useAtom(patientList);
  const [session] = useAtom(userSession);
  const [patientSelected, setPatientSelected] = useState('');
  const [isEmuOpen, setEmuOpen] = useState(false);
  const [excelData, setExcelData] = useState({
    rows: [],
    cols: [{ name: 'No Data', key: 0 }],
  });

  const fileHandler = (event) => {
    let fileObj = event.target.files[0];

    //just pass the fileObj as parameter
    //ExcelRenderer is a function
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        setExcelData({
          cols: resp.cols,
          rows: resp.rows,
        });
      }
    });
  };

  const handleUpload = async (list) => {
    let sheet = [...list];
    sheet.shift();
    console.log('sheet');
    console.log(sheet);
    let patientName = patients.filter((patient) => patient.Fname === patientSelected);
    for (let row of sheet) {
      const { data, error } = await supabase.from('TELEMETRY').insert([
        {
          D_Id: patientName[0].D_Id,
          created_at: row[0],
          Temperature: row[1],
          SpO2: row[2],
          Pressure: row[3],
          Status: row[4],
        },
      ]);
      if (error) throw error;
    }
    // new Date().toISOString().toLocaleString('zh-TW');
  };

  return (
    <div className="m-8 min-h-[92%] rounded-lg bg-gray-300 px-4 py-4">
      <div className="flex h-[100%] w-auto flex-col items-start justify-start rounded-lg bg-auto-white px-8 pt-8 shadow-lg ring-2 ring-black">
        <div className="flex w-[100%] items-start">
          <span className="text-large font-bold text-blue-600">
            Application Configuration
          </span>
          <div
            onClick={() => {
              setEmuOpen(true);
            }}
            className="duration-400 p-center ml-auto flex items-center justify-center py-2  text-[20px] tracking-wider text-black transition-all hover:border-r-4  hover:border-auto-white  hover:text-[22px] focus:border-r-4 focus:border-auto-white   focus:text-[22px] focus:text-auto-white"
          >
            <MdScreenSearchDesktop size={30} />
          </div>
          <TransitionsModal open={isEmuOpen}>
            <button
              onClick={() => setEmuOpen(false)}
              className="absolute -top-[1rem] -right-[1rem] rounded-full bg-white"
            >
              <AiOutlineCloseCircle size={30} />
            </button>
            <DeviceEmulatorFormContent
              // schema={device_schema}
              handleSubmit={() => setEmuOpen(false)}
            />
          </TransitionsModal>
        </div>

        <div className=" mt-4 w-[100%] overflow-y-scroll scrollbar p-2">
          <div className=" flex w-[100%] items-center rounded-lg shadow-lg ring-2 ring-gray-200">
            <span className="rounded-lg px-4  py-2 text-large tracking-[2px] text-gray-500 ring-2 ring-gray-500">
              Virtual Data
            </span>
            <span className="p-2 text-black">Choose a patient</span>
            <BasicSelect
              input={patientSelected}
              setInput={setPatientSelected}
              name={'Patient'}
              list={patients.map((patient) => patient.Fname)}
              style={{ width: 150, height: 50 }}
              variant="filled"
            />
            <label className="ml-auto mr-4 text-blue-600" htmlFor="single">
              Upload an excel sheet
            </label>
            <div>
              <input type="file" id="single" onChange={fileHandler} />
            </div>
          </div>
          <div className=" flex w-[100%] items-center justify-start   rounded-b-lg bg-gray-300 p-8">
            <OutTable
              data={excelData.rows}
              columns={excelData.cols}
              tableClassName="ExcelTable"
              tableHeaderRowClass="heading"
            />
          </div>
          <div className="w-[100%] shadow-lg ring-2 ring-gray-200 ">
            <button
              className="rounded-2xl px-4 py-2 text-[16px] text-black ring-2 ring-gray-300 hover:ring-black"
              onClick={() => handleUpload(excelData.rows)}
            >
              UPLOAD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DeviceEmulatorFormContent = (props) => {
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
export default Settings;
