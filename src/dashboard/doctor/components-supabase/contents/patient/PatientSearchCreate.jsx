import React, { useContext, useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { Typography } from '@mui/material';
import TransitionsModal from '@/shared/utilities/Modal';
import SelectFormField from '@/shared/utilities/form/SelectFormField';
import TextFormField from '@/shared/utilities/form/TextFormField';
import { client } from '@/shared/api/initClient_tenant';
import * as yup from 'yup';
import SearchBar from '../../components/SearchBar';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { supabase } from '@/shared/api/supabase/supabaseClient';
// import { AppContext } from '@/dashboard/doctor/App';
import { InfinitySpin } from 'react-loader-spinner';
import MultipleSelectChip from '@/shared/utilities/form/MultiSelect';
import { BiRefresh } from 'react-icons/bi';
import BasicSelect from '@/shared/utilities/form/BasicSelect';
import { userSession } from '@/dashboard/Auth';
import { useAtom } from 'jotai';
import { deviceList, facilityList } from '@/dashboard/doctor/App';

// const patient_schema = yup.object({
//   fname: yup.string().min(1).max(30).required(),
//   lname: yup.string().min(1).max(30).required(),
//   sex: yup.string().nullable(),
//   height: yup.number().nullable(),
//   weight: yup.number().nullable(),
//   bloodtype: yup.string().nullable(),
//   city: yup.string().nullable(),
//   district: yup.string().nullable(),
//   street: yup.string().nullable(),
//   email: yup.string().email().required(),
//   password: yup.string().min(6).max(30).nullable(),
//   label: yup.string().nullable(),
//   B_Number: yup.string().nullable(),
//   age: yup.number().nullable,
// });

const PatientSearchCreate = (props) => {
  const [session] = useAtom(userSession);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [devices, setDevices] = useAtom(deviceList);
  const [facilities, setFacilities] = useAtom(facilityList);

  const handleOpen = () => setOpen(true);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      console.log('registering patient..');

      const DEVICE = '';
      if (values.label) {
        let { data: DEVICE } = await supabase
          .from('DEVICE')
          .select('*')
          .eq('Label', values.label)
          .single();

        console.log('assigning device..');
        await supabase
          .from('DEVICE')
          .update({ Assign: values.fname })
          .eq('D_Id', DEVICE.D_Id);
      }
      if (values.B_Number) {
        console.log('assigning bed..');
        await supabase
          .from('BED')
          .update({ Assign: values.fname })
          .eq('B_Number', values.B_Number);
      }

      const { data: USER } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      console.log('activation mail sent!');

      const { error } = await supabase.from('PATIENT').insert([
        {
          P_Ssn: USER.user.id,
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
          D_Id: DEVICE && DEVICE.D_Id,
          B_Number: values.B_Number,
          Age: values.age,
          D_Label: DEVICE && DEVICE.Label,
          D_Ssn: session.user.id,
        },
      ]);
      console.log('add patient success!');
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <div className="ml-8 flex h-[80%] w-[50%] items-center justify-center rounded-[3rem] bg-black p-2 shadow-lg">
        <SearchBar search={props.search} setSearch={props.setSearch} />
      </div>
      <div className="ml-8 flex h-[80%] w-[15%] items-center justify-center rounded-[3rem] bg-blue-600 py-2 shadow-lg ring-2 ring-black hover:bg-blue-700">
        <button
          className="duration-600  rounded text-[18px] tracking-widest text-white transition-all"
          onClick={() => {
            handleOpen();
          }}
        >
          Create
        </button>
        <TransitionsModal open={open} style={{ width: 1100, height: 700 }}>
          <button
            onClick={() => setOpen(false)}
            className="absolute -top-[1rem] -right-[1rem] rounded-full bg-auto-white"
          >
            <AiOutlineCloseCircle size={30} />
          </button>
          <FacilityFormContent
            optionList={{
              devices: devices
                .filter((ele) => ele.Assign === 'No')
                .map((ele) => ele.Label),
              beds: Object.values(facilities)
                .map((room) => room.beds)
                .reduce(
                  (accumulator, currentValue) => accumulator.concat(currentValue),
                  [],
                ),
            }}
            // schema={patient_schema}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </TransitionsModal>
      </div>
      <button
        className="duration-600 ml-6 flex h-[80%] max-w-[10%] items-center justify-center rounded-[3rem] bg-gray-300 p-3 text-[18px] tracking-wider text-white ring-2 ring-black transition-all hover:bg-gray-400 hover:text-[20px] hover:tracking-[1px] focus:bg-gray-400"
        onClick={() => props.setRefresh((state) => !state)}
      >
        <BiRefresh size={30} color="black" />
      </button>
    </>
  );
};

const FacilityFormContent = (props) => {
  const [district, setDistrict] = React.useState('Others');
  const [city, setCity] = React.useState('Others');
  const [bloodtype, setBloodtype] = React.useState('A+');
  const [sex, setSex] = React.useState('Others');
  const [age, setAge] = React.useState(18);
  const [device, setDevice] = React.useState('');
  const [bed, setBed] = React.useState('');
  return (
    <div className="bg-auto-white">
      <Formik
        validateOnChange={false}
        // validationSchema={props.schema}
        initialValues={{
          fname: '',
          lname: '',

          height: '',
          weight: '',

          street: '',

          email: '',

          password: 'password',
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
          <Form className="bg-auto-white">
            <div className="flex flex-col items-start justify-start">
              <div className="mb-4 text-large font-bold tracking-wider text-blue-500">
                Register a new patient
              </div>
              <div className="text-[18px] text-blue-500">
                Please fill in all the necessary information.
                <br />
                The patient will use the given{' '}
                <span className="italic text-red-500">email</span> and{' '}
                <span className="italic text-red-500">password</span> to log in.
                <br />
                First name and last name are also required. All the other information can
                be filled in by the patient later.
              </div>
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
                    style={{ width: 300, marginLeft: 50, marginRight: 10 }}
                    variant="filled"
                  />
                  <Field
                    name="password"
                    component={TextFormField}
                    id="password"
                    label={`Password`}
                    helperText={`The default password is "password" if not specified.`}
                    style={{ width: 200, paddingTop: 10 }}
                    variant="filled"
                  />
                </div>
                <div className="text-[18px] text-blue-500">Personal information</div>
                <div className="flex items-center justify-start">
                  <BasicSelect
                    input={age}
                    setInput={setAge}
                    name={'Age'}
                    list={[
                      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                      19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
                      36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
                    ]}
                    style={{ width: 100, marginRight: 10 }}
                  />
                  <BasicSelect
                    input={sex}
                    setInput={setSex}
                    name={'Sex'}
                    list={['Male', 'Female', 'Others']}
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
                <div className="text-[18px] text-blue-500">Addresses</div>
                <div className="flex items-center justify-start">
                  <BasicSelect
                    input={city}
                    setInput={setCity}
                    name={'City'}
                    list={['HCMC', 'Hanoi', 'Danang', 'Others']}
                    style={{ width: 200, marginRight: 10 }}
                  />
                  <BasicSelect
                    input={district}
                    setInput={setDistrict}
                    name={'District'}
                    list={['District 1', 'Go Vap District', 'District 7', 'Others']}
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
                <div className="text-[18px] text-blue-500">{`Assign a bed and device (You can do this later).`}</div>
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
                  Or assign later.
                </div>
              </div>

              {props.loading ? (
                <div className="absolute bottom-[2rem] right-[3rem]">
                  <InfinitySpin width="300" color="#475569" />
                </div>
              ) : (
                <>
                  <button
                    className="absolute bottom-[4.5rem] right-[4rem] rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-400  "
                    type="submit"
                  >
                    Submit
                  </button>
                  <div className="mt-4 rounded-lg p-2 text-[16px] text-pink-500 ring-2 ring-pink-500">
                    Activation link will be sent to the email
                  </div>
                </>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default PatientSearchCreate;
