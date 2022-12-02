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
import { addOrUpdateNurse } from '@/shared/api/doctor/nurses';

const user_schema = yup.object({
  email: yup.string().min(5).max(15),
  firstName: yup.string().min(5).max(15),
  lastName: yup.string().min(5).max(15),
  facility: yup.object().nullable(),
});

const addNurse = async () => {
  console.log('connecting to server');
  let token = await client.connect();
  if (token) {
    await addOrUpdateNurse(client, assetCreationObj.nurse);
    db_doctor.patientList[`${assetCreationObj.nurse.email}`] = JSON.parse(
      JSON.stringify(assetCreationObj.nurse),
    );
  }
  console.log('db_doctor after adding nurse');
  console.log(db_doctor);
  assetCreationObj.nurse = {};
};

const NurseSearchCreate = () => {
  const [value, setValue] = useState({});


  assetCreationObj.nurse = {}
  assetCreationObj.nurse = {firstName: value.firstName, lastName: value.lastName, email: value.email, assign: {facility: {...value.facility}}}


  return (
    <>
      <SearchBar />
      <TransitionsModal>
        <FacilityFormContent
          optionList={{ ...db_doctor.roomList }}
          schema={user_schema}
          buttonName="Submit"
          setValue={setValue}
        />
      </TransitionsModal>
    </>
  );
};

const FacilityFormContent = (props) => {
  console.log('Lists of facilities');
  console.log(props.optionList);
  return (
    <Formik
      validateOnChange={false}
      validationSchema={props.schema}
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        facility: '',
      }}
      onSubmit={(values) => {
        props.setValue({ ...values });
      }}
    >
      {({ values }) => (
        <Form>
          <div>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add and assign a nurse to a room
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Nurses assigned to a room can monitor all occupied patients
            </Typography>
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
            {!props.optionList && (
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
            )}
            {props.optionList && (
              <Field
                options={props.optionList}
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
            )}
            <button
              className="absolute bottom-[4.5rem] right-[4rem] rounded bg-light-important px-4 py-2 text-auto-white hover:bg-auto-black hover:text-light-important  "
              type="submit"
              onClick={() => {
                if (props.buttonName === 'Submit') {
                  setTimeout(addNurse, 1000);
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
export default NurseSearchCreate;
