import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { Field, Form, Formik, setNestedObjectValues } from 'formik';
import { Typography } from '@mui/material';
import TransitionsModal from '@/shared/utilities/Modal';
import SelectFormField from '@/shared/utilities/form/SelectFormField';
import TextFormField from '@/shared/utilities/form/TextFormField';
import { db_doctor, assetCreationObj } from '@/dashboard/doctor/App';
import { client } from '@/shared/api/initClient_tenant';
import { addOrUpdateFacilities } from '@/shared/api/doctor/facilities';
import SearchBar from '../../SearchBar';

var tabSelectedInput = {};
const facility_schema = yup.object({
  existing: yup.object().nullable(),
  name: yup.string().min(5).max(15),
  label: yup.string().min(5).max(15),
});

const addAsset = async () => {
  console.log('connecting to server');
  let token = await client.connect();
  if (token) {
    let { name, label } = assetCreationObj.building;
    let randomObj = {};
    let building = {};
    let room = {};
    let bed = {};
    if (!db_doctor.facilityList[`${name}`]) {
      randomObj = {
        name: name,
        label: label,
        type: 'BUILDING',
      };
      building = await addOrUpdateFacilities(client, randomObj);
      db_doctor.facilityList[`${name}`] = { ...building, rooms: {} }; //better be ...building so we can get the Id if needed later
    }

    let r = { ...assetCreationObj.building.room };
    if (!db_doctor.facilityList[`${name}`].rooms[`${r.name}`]) {
      randomObj = {
        name: `${building.name}_${r.name}`,
        label: r.label,
        type: 'ROOM',
      };
      room = await addOrUpdateFacilities(client, randomObj);
      let params = {
        from: {
          id: db_doctor.facilityList[`${name}`]
            ? db_doctor.facilityList[`${name}`].id.id
            : building.id.id,
          entityType: 'ASSET',
        },
        to: {
          id: room.id.id,
          entityType: 'ASSET',
        },
        type: 'Contains',
        typeGroup: 'COMMON',
        additionalInfo: {},
      };
      await client.createRelation(params);
      db_doctor.facilityList[`${name}`].rooms[`${r.name}`] = { ...room, beds: {} };
    }

    let b = { ...assetCreationObj.building.room.bed };
    if (!db_doctor.facilityList[`${name}`].rooms[`${r.name}`].beds[`${b.name}`]) {
      randomObj = {
        name: `${building.name}_${room.name}_${b.name}`,
        label: b.label,
        type: 'BED',
      };
      bed = await addOrUpdateFacilities(client, randomObj);
      let params = {
        from: {
          id: db_doctor.facilityList[`${name}`].rooms[`${r.name}`]
            ? db_doctor.facilityList[`${name}`].rooms[`${r.name}`].id.id
            : room.id.id,
          entityType: 'ASSET',
        },
        to: {
          id: bed.id.id,
          entityType: 'ASSET',
        },
        type: 'Contains',
        typeGroup: 'COMMON',
        additionalInfo: {},
      };
      // console.log(params);
      await client.createRelation(params);
      db_doctor.facilityList[`${name}`].rooms[`${r.name}`].beds[`${b.name}`] = {
        ...bed,
      };
    }
  }
  console.log('db_doctor after adding asset');
  console.log(db_doctor);
  assetCreationObj.building = {};
};

const FacilitySearchCreate = () => {
  const [isTab, setTab] = useState({
    buildingTab: '',
    roomTab: 'hidden',
    bedTab: 'hidden',
  });
  const [value, setValue] = useState({});
  console.log('tabSelectedInput:');
  console.log(tabSelectedInput);
  let tempValue = '';
  if (isTab.buildingTab === '') {
    assetCreationObj.building = value.existing
      ? { room: {}, ...value.existing }
      : { room: {}, ...value };
    tabSelectedInput = { ...db_doctor.facilityList };
  } else if (isTab.roomTab === '') {
    assetCreationObj.building['room'] = value.existing
      ? { bed: {}, ...value.existing }
      : { bed: {}, ...value };
    tabSelectedInput = value.existing
      ? { ...tabSelectedInput[`${value.existing.name}`].rooms }
      : null;
    tempValue = value.existing.name;
  } else {
    assetCreationObj.building['room']['bed'] = value.existing
      ? { ...value.existing }
      : { ...value };
    tabSelectedInput = value.existing
      ? { ...tabSelectedInput[`${value.existing.name}`].beds }
      : null;
  }

  return (
    <>
      <SearchBar />
      <TransitionsModal setTab={setTab}>
        <div className={isTab.buildingTab}>
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
          <FacilityFormContent
            optionList={tabSelectedInput}
            schema={facility_schema}
            type="Building"
            setTab={setTab}
            setTabValue={{ buildingTab: 'hidden', roomTab: '', bedTab: 'hidden' }}
            buttonName="Next"
            setValue={setValue}
          />
        </div>
        <div className={isTab.roomTab}>
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
          <FacilityFormContent
            optionList={tabSelectedInput}
            schema={facility_schema}
            type="Room"
            setTab={setTab}
            setTabValue={{ buildingTab: 'hidden', roomTab: 'hidden', bedTab: '' }}
            buttonName="Next"
            setValue={setValue}
          />
          <button
            className="absolute bottom-[4.5rem] left-[4rem] rounded bg-light-important px-4 py-2 text-auto-white hover:bg-auto-black hover:text-light-important"
            type="button"
            onClick={() =>
              setTab(() => ({ buildingTab: '', roomTab: 'hidden', bedTab: 'hidden' }))
            }
          >
            Back
          </button>
        </div>
        <div className={isTab.bedTab}>
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
          <FacilityFormContent
            optionList={tabSelectedInput}
            schema={facility_schema}
            type="Bed"
            buttonName="Submit"
            setValue={setValue}
          />

          <button
            className="absolute bottom-[4.5rem] left-[4rem] rounded bg-light-important px-4 py-2 text-auto-white hover:bg-auto-black hover:text-light-important"
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
  console.log('List of options');
  console.log(props.optionList);
  return (
    <Formik
      validateOnChange={false}
      validationSchema={props.schema}
      initialValues={{
        name: '',
        label: '',
        existing: Object.values(props.optionList)[0],
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
              Create a new <span className="text-light-important">{props.type}</span>
            </button>
            {isCreated && !isSelected ? (
              <div className="mt-6">
                <Field
                  name="name"
                  component={TextFormField}
                  required
                  id="name-required"
                  label={`${props.type} Id`}
                  helperText={`Please type the id of your ${props.type}`}
                />
                <Field
                  name="label"
                  component={TextFormField}
                  required
                  id="label-required"
                  label={`${props.type} Name`}
                  helperText={`Please type the name of your ${props.type}`}
                />
              </div>
            ) : null}
            <button
              className="absolute bottom-[4.5rem] right-[4rem] rounded bg-light-important px-4 py-2 text-auto-white hover:bg-auto-black hover:text-light-important  "
              type="submit"
              onClick={() => {
                if (props.buttonName === 'Submit') {
                  setTimeout(addAsset, 1000);
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
