import React, { useState } from 'react';
import * as yup from 'yup';
import { Field, Form, Formik, setNestedObjectValues } from 'formik';
import { Typography } from '@mui/material';
import TransitionsModal from '@/shared/utilities/Modal';
import SelectFormField from '@/shared/utilities/form/SelectFormField';
import TextFormField from '@/shared/utilities/form/TextFormField';
import { db_doctor } from '@/dashboard/doctor/App';
import { client } from '@/shared/api/initClient_tenant';
import { addOrUpdateFacilities } from '@/shared/api/doctor/facilities';

export var assetCreationObj = {};

const addAsset = async () => {
  console.log('connecting to server');
  let token = await client.connect();
  if (token) {
    let { name, label } = assetCreationObj;
    const building = await addOrUpdateFacilities(client, {
      name: name,
      label: label,
      type: 'BUILDING',
    });
    let r = { ...assetCreationObj.room };
    const room = await addOrUpdateFacilities(client, {
      name: r.name,
      label: r.label,
      type: 'ROOM',
    });
    let b = { ...assetCreationObj.room.bed };
    const bed = await addOrUpdateFacilities(client, {
      name: b.name,
      label: b.label,
      type: 'BED',
    });
  }
  assetCreationObj = {};
};

const schema = yup.object({
  exisitng: yup.array().nullable(),
  name: yup.string().min(5).max(15),
  label: yup.string().min(5).max(15),
});

const FacilitySearchCreate = () => {
  const [isTab, setTab] = useState({
    buildingTab: '',
    roomTab: 'hidden',
    bedTab: 'hidden',
  });
  const [value, setValue] = useState({});
  if (isTab.buildingTab === '') {
    assetCreationObj = { room: {}, ...value };
  } else if (isTab.roomTab === '') {
    assetCreationObj['room'] = { bed: {}, ...value };
  } else {
    assetCreationObj['room']['bed'] = { ...value };
  }

  // if (assetCreationObj['room']) {
  //   console.log('?')
  //   if (assetCreationObj['room']['bed']) {
  //     assetCreationObj['room']['bed'] = { ...value };
  //     addAsset();
  //   } else {
  //     assetCreationObj['room'] = { bed: {}, ...value };
  //   }
  // } else {
  //   assetCreationObj = { room: {}, ...value };
  // }
  console.log(value);
  console.log(assetCreationObj);
  return (
    <>
      <div>Search</div>
      <TransitionsModal>
        <div className={isTab.buildingTab}>
          <FacilityFormContent
            optionList={db_doctor.facilityList}
            schema={schema}
            type="Building"
            setTab={setTab}
            setTabValue={{ buildingTab: 'hidden', roomTab: '', bedTab: 'hidden' }}
            buttonName="Next"
            passingIn={assetCreationObj}
            setValue={setValue}
          />
        </div>
        <div className={isTab.roomTab}>
          <FacilityFormContent
            optionList={db_doctor.facilityList}
            schema={schema}
            type="Room"
            setTab={setTab}
            setTabValue={{ buildingTab: 'hidden', roomTab: 'hidden', bedTab: '' }}
            buttonName="Next"
            passingIn={assetCreationObj}
            setValue={setValue}
          />
          <button
            className="absolute bottom-[7.5rem] left-[4rem] rounded bg-light-important px-4 py-2 text-auto-white hover:bg-auto-black hover:text-light-important"
            type="button"
            onClick={() =>
              setTab(() => ({ buildingTab: '', roomTab: 'hidden', bedTab: 'hidden' }))
            }
          >
            Back
          </button>
        </div>
        <div className={isTab.bedTab}>
          <FacilityFormContent
            optionList={db_doctor.facilityList}
            schema={schema}
            type="Bed"
            buttonName="Submit"
            passingIn={assetCreationObj}
            setValue={setValue}
          />

          <button
            className="absolute bottom-[7.5rem] left-[4rem] rounded bg-light-important px-4 py-2 text-auto-white hover:bg-auto-black hover:text-light-important"
            type="button"
            onClick={() =>
              setTab(() => ({ buildingTab: 'hidden', roomTab: '', bedTab: 'hidden' }))
            }
          >
            Back
          </button>
        </div>
      </TransitionsModal>
    </>
  );
};

const FacilityFormContent = (props) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [value, setValue] = useState('');

  return (
    <Formik
      validationSchema={props.schema}
      initialValues={{
        name: '',
        label: '',
        existing: '',
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
              Choose a {props.type}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Please select an existing {props.type}. Or create a new one.
            </Typography>
            {!props.optionList && (
              <Field
                options={null}
                name="existing"
                component={SelectFormField}
                id="standard-select"
                label="None available"
                value={value}
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
                  value={value}
                  select
                  variant="standard"
                  onOpen={() => {
                    setIsCreated(false);
                    setIsSelected(true);
                  }}
                  onChange={(e) => {
                    setValue(e.target.value);
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
                  value=""
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
              className="absolute top-[7.3rem] right-[4rem] rounded bg-auto-white p-2 hover:text-light-important hover:ring-2  hover:ring-gray-700"
            >
              Create a new <span className="text-light-important">{props.type}</span>
            </button>
            {isCreated && !isSelected ? (
              <div className="mt-6">
                <Field
                  name="name"
                  component={TextFormField}
                  required
                  id="name-required"
                  label={`${props.type} Name`}
                  helperText={`Please type the name of your ${props.type}`}
                />
                <Field
                  name="label"
                  component={TextFormField}
                  required
                  id="label-required"
                  label={`${props.type} Label`}
                  helperText={`Please indicate the label of your ${props.type}`}
                />
              </div>
            ) : null}
            <button
              className="absolute bottom-[7.5rem] right-[4rem] rounded bg-light-important px-4 py-2 text-auto-white hover:bg-auto-black hover:text-light-important  "
              type="submit"
              onClick={() => {
                if (props.buttonName === 'Submit') {
                  setTimeout(addAsset, 2000);
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

export default FacilitySearchCreate;
