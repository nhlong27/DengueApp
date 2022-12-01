import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { Field, Form, Formik, setNestedObjectValues } from 'formik';
import { Typography } from '@mui/material';
import TransitionsModal from '@/shared/utilities/Modal';
import SelectFormField from '@/shared/utilities/form/SelectFormField';
import TextFormField from '@/shared/utilities/form/TextFormField';
import { db_doctor, assetCreationObj } from '@/dashboard/doctor/App';
import { client } from '@/shared/api/initClient_tenant';
import SearchBar from '../../SearchBar';
import { addOrUpdatePatient } from '@/shared/api/doctor/dashboard';
import { countryList, cityList } from '@/shared/constants/requestSchema';

const customer_schema = yup.object({
  country: yup.string().nullable(),
  city: yup.string().nullable(),
  title: yup.string().min(5).max(15),
  address: yup.string().min(5).max(15),
  phone: yup.string().min(5).max(15),
});
const user_schema = yup.object({
  email: yup.string().min(5).max(15),
  firstName: yup.string().min(5).max(15),
  lastName: yup.string().min(5).max(15),
});
const assign_schema = yup.object({
  facility: yup.object().nullable(),
  device: yup.object().nullable(),
});

const addPatient = async () => {
  console.log('connecting to server');
  let token = await client.connect();
  if (token) {
    await addOrUpdatePatient(client, assetCreationObj.patient);
    db_doctor.patientList[`${assetCreationObj.patient.title}`] = JSON.parse(
      JSON.stringify(assetCreationObj.patient),
    );
  }
  console.log('db_doctor after adding patient');
  console.log(db_doctor);
  assetCreationObj.patient = {};
};

const PatientSearchCreate = () => {
  const [isTab, setTab] = useState({
    customerTab: '',
    userTab: 'hidden',
    assignTab: 'hidden',
  });
  const [value, setValue] = useState({});

  if (isTab.customerTab === '') {
    assetCreationObj.patient = { ...value };
  } else if (isTab.userTab === '') {
    assetCreationObj.patient.user = {};
    assetCreationObj.patient.user = { ...value };
  } else {
    assetCreationObj.patient.user.assign = {};
    assetCreationObj.patient.user.assign = { device: '', facility: '', ...value };
  }

  return (
    <>
      <SearchBar />
      <TransitionsModal setTab={setTab}>
        <div className={isTab.customerTab}>
          <div className="relative pt-1">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <span className="inline-block rounded bg-auto-white py-1 px-2 text-xs font-semibold uppercase text-light-important">
                  Step 1
                </span>
              </div>
            </div>
            <div className="mb-4 flex h-2 overflow-hidden rounded bg-auto-white text-xs">
              <div
                className={`flex w-[30%] flex-col justify-center whitespace-nowrap bg-light-important text-center text-white shadow-none`}
              ></div>
            </div>
          </div>
          <FacilityFormContentCustomer
            optionList={[{ ...countryList }, { ...cityList }]}
            schema={customer_schema}
            setTab={setTab}
            setTabValue={{ customerTab: 'hidden', userTab: '', assignTab: 'hidden' }}
            buttonName="Next"
            setValue={setValue}
          />
        </div>
        <div className={isTab.userTab}>
          <div className="relative pt-1">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <span className="inline-block rounded bg-auto-white py-1 px-2 text-xs font-semibold uppercase text-light-important">
                  Step 2
                </span>
              </div>
            </div>
            <div className="mb-4 flex h-2 overflow-hidden rounded bg-auto-white text-xs">
              <div
                className={`flex w-[66%] flex-col justify-center whitespace-nowrap bg-light-important text-center text-white shadow-none`}
              ></div>
            </div>
          </div>
          <FacilityFormContentUser
            schema={user_schema}
            setTab={setTab}
            setTabValue={{ customerTab: 'hidden', userTab: 'hidden', assignTab: '' }}
            buttonName="Next"
            setValue={setValue}
          />
          <button
            className="absolute bottom-[4.5rem] left-[4rem] rounded bg-light-important px-4 py-2 text-auto-white hover:bg-auto-black hover:text-light-important"
            type="button"
            onClick={() =>
              setTab(() => ({ customerTab: '', userTab: 'hidden', assignTab: 'hidden' }))
            }
          >
            Back
          </button>
        </div>
        <div className={isTab.assignTab}>
          <div className="relative pt-1">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <span className="inline-block rounded bg-auto-white py-1 px-2 text-xs font-semibold uppercase text-light-important">
                  Step 3
                </span>
              </div>
            </div>
            <div className="mb-4 flex h-2 overflow-hidden rounded bg-auto-white text-xs">
              <div
                className={`flex w-[100%] flex-col justify-center whitespace-nowrap bg-light-important text-center text-white shadow-none`}
              ></div>
            </div>
          </div>
          <FacilityFormContentAssign
            optionList={[{ ...db_doctor.bedList }, { ...db_doctor.deviceList }]}
            schema={assign_schema}
            buttonName="Submit"
            setValue={setValue}
          />

          <button
            className="absolute bottom-[4.5rem] left-[4rem] rounded bg-light-important px-4 py-2 text-auto-white hover:bg-auto-black hover:text-light-important"
            type="button"
            onClick={() =>
              setTab(() => ({ customerTab: 'hidden', userTab: '', assignTab: 'hidden' }))
            }
          >
            Back
          </button>
        </div>
      </TransitionsModal>
    </>
  );
};

const FacilityFormContentCustomer = (props) => {
  console.log('Lists of countries and cities');
  console.log(props.optionList);
  return (
    <Formik
      validateOnChange={false}
      validationSchema={props.schema}
      initialValues={{
        title: '',
        country: '',
        city: '',
        address: '',
        phone: '',
      }}
      onSubmit={(values) => {
        props.setValue({ ...values });
        if (props.setTab) {
          props.setTab(() => {
            return props.setTabValue;
          });
        }
      }}
    >
      {({ values }) => (
        <Form>
          <div class={`${props.isTab}`}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add a patient
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Please create a new patient and fill out their details.
            </Typography>
            <div className="mt-6">
              <Field
                name="title"
                component={TextFormField}
                required
                id="title-required"
                label={`Username`}
                helperText={`Please type the username of the patient`}
              />
              <Field
                options={props.optionList[0]}
                name="country"
                component={SelectFormField}
                id="country-select"
                label="Select country"
                select
                variant="standard"
                onChange={(e) => {
                  values.country = e.target.value;
                }}
              />
              <Field
                options={props.optionList[1]}
                name="city"
                component={SelectFormField}
                id="city-select"
                label="Select city"
                select
                variant="standard"
                onChange={(e) => {
                  values.city = e.target.value;
                }}
              />
              <Field
                name="address"
                component={TextFormField}
                required
                id="address-required"
                label={`Address`}
                helperText={`Please type the address of the patient`}
              />
              <Field
                name="phone"
                component={TextFormField}
                required
                id="phone-required"
                label={`Phone number`}
                helperText={`Please type the phone number of the patient`}
              />
            </div>
            <button
              className="absolute bottom-[4.5rem] right-[4rem] rounded bg-light-important px-4 py-2 text-auto-white hover:bg-auto-black hover:text-light-important  "
              type="submit"
            >
              {props.buttonName}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const FacilityFormContentUser = (props) => {
  return (
    <Formik
      validateOnChange={false}
      validationSchema={props.schema}
      initialValues={{
        email: '',
        firstName: '',
        lastName: '',
      }}
      onSubmit={(values) => {
        props.setValue({ ...values });
        if (props.setTab) {
          props.setTab(() => {
            return props.setTabValue;
          });
        }
      }}
    >
      {({ values }) => (
        <Form>
          <div>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Continue
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Note: patient will have to use the email below to activate account and sign
              in
            </Typography>
            <div className="mt-6">
              <Field
                name="email"
                component={TextFormField}
                required
                id="email-required"
                label={`Patient's email`}
                helperText={`Please type the correct email syntax`}
              />
              <Field
                name="firstName"
                component={TextFormField}
                required
                id="firstName-required"
                label={`First Name`}
                helperText={`Please type the first name of your patient`}
              />
              <Field
                name="lastName"
                component={TextFormField}
                required
                id="lastName-required"
                label={`Last Name`}
                helperText={`Please type the last name of your patient`}
              />
            </div>
            <button
              className="absolute bottom-[4.5rem] right-[4rem] rounded bg-light-important px-4 py-2 text-auto-white hover:bg-auto-black hover:text-light-important  "
              type="submit"
            >
              {props.buttonName}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const FacilityFormContentAssign = (props) => {
  console.log('Lists of facilities and devices');
  console.log(props.optionList);
  return (
    <Formik
      validateOnChange={false}
      validationSchema={props.schema}
      initialValues={{
        facility: '',
        device: '',
      }}
      onSubmit={(values) => {
        props.setValue({ ...values });
        // if (props.setTab) {
        //   props.setTab(() => {
        //     return props.setTabValue;
        //   });
        // }
      }}
    >
      {({ values }) => (
        <Form>
          <div>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Assignment
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Please assign an existing device and facility to the patient.
            </Typography>
            {!props.optionList && (
              <>
                <Field
                  options={null}
                  name="facility"
                  component={SelectFormField}
                  id="standard-select"
                  label="None available"
                  defaultValue=""
                  select
                  variant="standard"
                />
                <Field
                  options={null}
                  name="device"
                  component={SelectFormField}
                  id="standard-select"
                  label="None available"
                  defaultValue=""
                  select
                  variant="standard"
                />
              </>
            )}
            {props.optionList && (
              <>
                <Field
                  options={props.optionList[0]}
                  name="facility"
                  component={SelectFormField}
                  id="facility-select"
                  label="Assign a building - room - bed"
                  select
                  variant="standard"
                  onChange={(e) => {
                    values.facility = e.target.value;
                  }}
                />
                <Field
                  options={props.optionList[1]}
                  name="device"
                  select
                  component={SelectFormField}
                  id="device-select"
                  label="Assign a device"
                  defaultValue=""
                  variant="standard"
                  onChange={(e) => {
                    values.device = e.target.value;
                  }}
                />
              </>
            )}
            <button
              className="absolute bottom-[4.5rem] right-[4rem] rounded bg-light-important px-4 py-2 text-auto-white hover:bg-auto-black hover:text-light-important  "
              type="submit"
              onClick={() => {
                if (props.buttonName === 'Submit') {
                  setTimeout(addPatient, 1000);
                }
              }}
            >
              {props.buttonName}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PatientSearchCreate;
