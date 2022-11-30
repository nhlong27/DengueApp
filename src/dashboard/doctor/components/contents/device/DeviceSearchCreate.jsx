import React, { useState } from 'react';
import { Field, Form, Formik, setNestedObjectValues } from 'formik';
import { Typography } from '@mui/material';
import TransitionsModal from '@/shared/utilities/Modal';
import SelectFormField from '@/shared/utilities/form/SelectFormField';
import TextFormField from '@/shared/utilities/form/TextFormField';
import { client } from '@/shared/api/initClient_tenant';
import * as yup from 'yup';
import SearchBar from '../../SearchBar';
import { db_doctor, assetCreationObj } from '@/dashboard/doctor/App';
import { addOrUpdateDevice } from '@/shared/api/doctor/devices';

const device_schema = yup.object({
  existing: yup.object().nullable(),
  name: yup.string().min(5).max(15),
  label: yup.string().min(5).max(15),
  type: yup.string().min(5).max(15),
});

const addDevice = async () => {
  console.log('connecting to server');
  let token = await client.connect();
  if (token) {
    let { name, label, type } = assetCreationObj.device;
    let randomObj = {
      name: name,
      label: label,
      type: type,
    };
    const device = await addOrUpdateDevice(client, randomObj);
    db_doctor.deviceList[`${name}`] = { ...device };
  }
  console.log('db_doctor after adding device');
  console.log(db_doctor);
  assetCreationObj.device = {};
};

const DeviceSearchCreate = () => {
  const [value, setValue] = useState({});

  assetCreationObj.device = value.existing ? { ...value.existing } : { ...value };

  return (
    <>
      <SearchBar />
      <TransitionsModal>
        <FacilityFormContent
          optionList={db_doctor.deviceList}
          schema={device_schema}
          setValue={setValue}
        />
      </TransitionsModal>
    </>
  );
};

const FacilityFormContent = (props) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  console.log('List of options');
  console.log(props.optionList);
  return (
    <Formik
      validateOnChange={false}
      validationSchema={props.schema}
      initialValues={{
        name: '',
        label: '',
        type: '',
        existing: '',
      }}
      onSubmit={(values) => {
        props.setValue({ ...values });
      }}
    >
      {({ values }) => (
        <Form>
          <div>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add a device
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Please select an existing device. Or create a new one.
            </Typography>
            {!props.optionList && (
              <Field
                options={null}
                name="existing"
                component={SelectFormField}
                id="standard-select"
                label="None available"
                defaultValue=""
                select
                variant="standard"
              />
            )}
            {props.optionList &&
              (!isCreated ? (
                <Field
                  options={props.optionList}
                  name="existing"
                  component={SelectFormField}
                  id="standard-select"
                  label="Select one"
                  select
                  variant="standard"
                  onOpen={() => {
                    setIsCreated(false);
                    setIsSelected(true);
                  }}
                  onChange={(e) => {
                    values.existing = e.target.value;
                  }}
                />
              ) : (
                <Field
                  options={props.optionList}
                  name="existing"
                  select
                  component={SelectFormField}
                  id="standard-select"
                  label="None"
                  defaultValue=""
                  variant="standard"
                  onOpen={() => {
                    setIsCreated(false);
                    setIsSelected(true);
                  }}
                />
              ))}
            <button
              onClick={() => {
                setIsCreated(true);
                setIsSelected(false);
              }}
              className="absolute top-[11rem] right-[4rem] rounded bg-auto-white p-2 hover:text-light-important hover:ring-2  hover:ring-gray-700"
            >
              Create a new <span className="text-light-important">device</span>
            </button>
            {isCreated && !isSelected ? (
              <div className="mt-6">
                <Field
                  name="name"
                  component={TextFormField}
                  required
                  id="name-required"
                  label={`Device Id`}
                  helperText={`Please type the id of your device`}
                />
                <Field
                  name="label"
                  component={TextFormField}
                  required
                  id="label-required"
                  label={`Device Name`}
                  helperText={`Please type the name of your device`}
                />
                <Field
                  name="type"
                  component={TextFormField}
                  required
                  id="type-required"
                  label={`Device Type`}
                  placeholder={`Temperature Sensor`}
                  helperText={`Please indicate the type of your device`}
                />
              </div>
            ) : null}
            <button
              className="absolute bottom-[4.5rem] right-[4rem] rounded bg-light-important px-4 py-2 text-auto-white hover:bg-auto-black hover:text-light-important  "
              type="submit"
              onClick={() => {
                setTimeout(addDevice, 1000);
              }}
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default DeviceSearchCreate;
