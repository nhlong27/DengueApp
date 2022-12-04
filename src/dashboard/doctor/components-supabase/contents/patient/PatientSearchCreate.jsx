import React, { useContext, useEffect, useState } from 'react';
import { Field, Form, Formik, setNestedObjectValues } from 'formik';
import { Typography } from '@mui/material';
import TransitionsModal from '@/shared/utilities/Modal';
import SelectFormField from '@/shared/utilities/form/SelectFormField';
import TextFormField from '@/shared/utilities/form/TextFormField';
import { client } from '@/shared/api/initClient_tenant';
import * as yup from 'yup';
import SearchBar from '../../SearchBar';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { AppContext } from '@/dashboard/doctor/App';
import { InfinitySpin } from 'react-loader-spinner';
import MultipleSelectChip from '@/shared/utilities/form/MultiSelect';
import { BiRefresh } from 'react-icons/bi';
import BasicSelect from '@/shared/utilities/form/BasicSelect';

const patient_schema = yup.object({
  fname: yup.string().min(1).max(30),
  lname: yup.string().min(1).max(30),
  sex: yup.string(),
  height: yup.number(),
  weight: yup.number(),
  bloodtype: yup.string(),
  city: yup.string(),
  district: yup.string(),
  street: yup.string(),
  email: yup.string(),
  label: yup.string(),
  B_Number: yup.string(),
});

const PatientSearchCreate = (props) => {
  const { session } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [devices, setDevices] = useState([]);
  const [beds, setBeds] = useState([]);
  const [deviceLoading, setDeviceLoading] = useState(false);
  const [bedLoading, setBedLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleDeviceLoad = async () => {
    try {
      setDeviceLoading(true);
      let { data: DEVICE, error } = await supabase.from('DEVICE').select('*');
      if (error) throw error;
      let deviceList = DEVICE.map((ele) => ele.Label);
      setDevices(deviceList);
      console.log(deviceList);

      console.log('get devices for assigning patient success!');
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      setDeviceLoading(false);
    }
  };
  const handleBedLoad = async () => {
    try {
      setBedLoading(true);
      let { data: BED, error } = await supabase.from('BED').select('*');
      if (error) throw error;
      let bedList = BED.map((ele) => ele.B_Number);
      setBeds(bedList);
      console.log(bedList)
      console.log('get beds for assigning patient success!');
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      setBedLoading(false);
    }
  };
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      let now = Date.now();
      await supabase.from('PERSON').insert([{ Per_Ssn: now, D_Ssn: session.user.id }]);
      let { data: DEVICE } = await supabase
        .from('DEVICE')
        .select('*')
        .eq('Label', values.label);
      let { data: BED, error } = await supabase
        .from('BED')
        .select('*')
        .eq('B_Number', values.B_Number);
      await supabase.from('PATIENT').insert([
        {
          Fname: values.fname,
          Lname: values.lname,
          Sex: values.sex,
          Height: parseInt(values.height),
          Weight: parseInt(values.weight),
          BloodType: values.bloodtype,
          City: values.city,
          District: values.district,
          Street: values.street,
          Email: values.email,
          D_Id: DEVICE[0].D_Id,
          B_Number: BED[0].B_Number,
          Per_Ssn: now,
          Age: values.age,
        },
      ]);
      if (error) throw error;
      console.log('add patient success!');
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      console.log('remember to send mail later');
      // let { data, error } = await supabase.auth.signInWithOtp({
      //   email: 'iamfallers@gmail.com',
      // });
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <div className="ml-8 flex h-[80%] w-[50%] items-center justify-center rounded-[3rem] bg-black p-2 shadow-lg">
        <SearchBar value={props.value} setValue={props.setValue} />
      </div>
      <div className="ml-8 flex h-[80%] w-[15%] items-center justify-center rounded-[3rem] bg-blue-600 py-2 shadow-lg">
        <button
          className="duration-600  rounded bg-blue-600 text-[18px] tracking-widest text-white transition-all hover:text-[20px] hover:tracking-[4px]"
          onClick={() => {
            handleOpen();
            handleDeviceLoad();
            handleBedLoad();
          }}
        >
          Create
        </button>
        {deviceLoading || bedLoading ? (
          <div className="fixed flex h-screen w-screen items-center justify-center">
            <InfinitySpin width="500" color="#475569" />
          </div>
        ) : (
          <TransitionsModal open={open} style={{ width: 1000, height: 700 }}>
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-[1rem] -right-[1rem] rounded-full bg-white"
            >
              <AiOutlineCloseCircle size={30} />
            </button>
            <FacilityFormContent
              optionList={{ devices: devices, beds: beds }}
              schema={patient_schema}
              handleSubmit={handleSubmit}
              loading={loading}
            />
          </TransitionsModal>
        )}
      </div>
      <button
        className="duration-600 ml-6 max-w-[10%] rounded-[3rem] bg-gray-300 p-3 text-[18px] tracking-wider text-white transition-all hover:bg-gray-400 hover:text-[20px] hover:tracking-[1px] focus:bg-gray-400"
        onClick={() => {}}
      >
        <BiRefresh size={30} color="black" />
      </button>
    </>
  );
};

const FacilityFormContent = (props) => {
  const [district, setDistrict] = React.useState('');
  const [city, setCity] = React.useState('');
  const [bloodtype, setBloodtype] = React.useState('');
  const [sex, setSex] = React.useState('');
  const [age, setAge] = React.useState('');
  const [device, setDevice] = React.useState('');
  const [bed, setBed] = React.useState('');
  return (
    <Formik
      validateOnChange={false}
      validationSchema={props.schema}
      initialValues={{
        fname: '',
        lname: '',
        sex: '',
        height: '',
        weight: '',
        bloodtype: '',
        city: '',
        district: '',
        street: '',
        label: '',
        B_Number: '',
        email: '',
        age: '',
      }}
      onSubmit={(values) => {
        props.handleSubmit({
          ...values,
          city: city,
          district: district,
          bloodtype: bloodtype,
          sex: sex,
          label: device,
          B_Number: bed,
          age: age,
        });
      }}
    >
      {({ values }) => (
        <Form>
          <div className="flex flex-col items-start justify-start">
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add a patient
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Please fill in all the necessary information
            </Typography>
            <div className={`mt-6`}>
              <div className="flex items-center justify-start">
                <Field
                  name="fname"
                  component={TextFormField}
                  required
                  id="fname-required"
                  label={`First Name`}
                  placeholder={`Long`}
                  helperText={`Please type the first name`}
                  style={{ width: 200, marginRight: 10 }}
                  variant="filled"
                />
                <Field
                  name="lname"
                  component={TextFormField}
                  required
                  id="lname-required"
                  label={`Last Name`}
                  placeholder={`Nguyen`}
                  helperText={`Please type the last name`}
                  style={{ width: 200, marginRight: 10 }}
                  variant="filled"
                />

                <Field
                  name="email"
                  component={TextFormField}
                  required
                  id="email-required"
                  label={`Email`}
                  placeholder={`nhlong2706@gmail.com`}
                  helperText={`Please type in your email`}
                  style={{ width: 300, marginLeft: 50 }}
                  variant="filled"
                />
              </div>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Personal Information
              </Typography>
              <div className="flex items-center justify-start">
                <BasicSelect
                  input={age}
                  setInput={setAge}
                  name={'Age'}
                  list={[
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
                    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
                    37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
                  ]}
                  style={{ width: 100, marginRight: 10 }}
                />
                <BasicSelect
                  input={sex}
                  setInput={setSex}
                  name={'Sex'}
                  list={['male', 'female', 'others']}
                  style={{ width: 100, marginRight: 10 }}
                />
                <Field
                  name="height"
                  component={TextFormField}
                  id="height"
                  label={`Height (In cm)`}
                  style={{ width: 200, marginRight: 10 }}
                />
                <Field
                  name="weight"
                  component={TextFormField}
                  required
                  id="weight"
                  label={`Weight (In kg)`}
                  style={{ width: 200, marginRight: 10 }}
                />
                <BasicSelect
                  input={bloodtype}
                  setInput={setBloodtype}
                  name={'Blood Type'}
                  list={['O+', 'O-', 'A+', 'A-', 'B+', 'B+', 'AB+', 'AB+']}
                  style={{ width: 200, marginRight: 10 }}
                />
              </div>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Addresses
              </Typography>
              <div className="flex items-center justify-start">
                <BasicSelect
                  input={city}
                  setInput={setCity}
                  name={'City'}
                  list={['HCMC', 'Hanoi', 'Danang']}
                  style={{ width: 200, marginRight: 10 }}
                />
                <BasicSelect
                  input={district}
                  setInput={setDistrict}
                  name={'District'}
                  list={['District 1', 'Go Vap District', 'District 7']}
                  style={{ width: 200, marginRight: 10 }}
                />
                <Field
                  name="street"
                  component={TextFormField}
                  id="street"
                  label={`Street address`}
                  placeholder={`810 Pham Ngu Lao Str.`}
                  style={{ width: 300, marginRight: 10 }}
                  variant="filled"
                />
              </div>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Please select a bed and device to assign to the patient
              </Typography>
              <div className="flex items-center justify-start">
                <BasicSelect
                  input={device}
                  setInput={setDevice}
                  name={'Assign a device'}
                  list={props.optionList.devices}
                  style={{ width: 200, marginRight: 10 }}
                />
                <BasicSelect
                  input={bed}
                  setInput={setBed}
                  name={'Assign a bed'}
                  list={props.optionList.beds}
                  style={{ width: 200, marginRight: 10 }}
                />
              </div>
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
                Submit
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default PatientSearchCreate;
