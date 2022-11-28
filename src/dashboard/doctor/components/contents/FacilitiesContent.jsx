import SelectFormField from '@/shared/utilities/form/SelectFormField';
import TextFormField from '@/shared/utilities/form/TextFormField';
import TransitionsModal from '@/shared/utilities/Modal';
import { Typography } from '@mui/material';
import { Field, Form, Formik, setNestedObjectValues } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';

var buildings = [
  { label: 'A', value: 'checkthisout' },
  { label: 'B', value: 'morevalue' },
];
const FacilitiesContent = () => {
  const [isBuilding, setIsBuilding] = useState(false);

  return (
    <TransitionsModal>
      {isBuilding ? (
        <FacilityFormContent optionList={buildings} schema={schema2} />
      ) : (
        <FacilityFormContent optionList={null} schema={schema1} />
      )}
    </TransitionsModal>
  );
};

const schema1 = yup.object({
  buildingname: yup.string().required().min(3).max(15),
  building: yup.array().nullable(),
  buildinglabel: yup.string().required().min(3).max(15),
  roomname: yup.string().required().min(3).max(15),
  room: yup.array().nullable(),
  roomlabel: yup.string().required().min(3).max(15),
  bedname: yup.string().required().min(3).max(15),
  bed: yup.array().nullable(),
  bedlabel: yup.string().required().min(3).max(15),
});
const schema2 = yup.object({
  building: yup.array().nullable(),
  room: yup.array().nullable(),
  bed: yup.array().nullable(),
});

const FacilityFormContent = (props) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [buildingValue, setBuildingValue] = useState('');
  const [roomValue, setRoomValue] = useState('');
  const [bedValue, setBedValue] = useState('');
  const [isTab, setTab] = useState({
    buildingTab: '',
    roomTab: 'hidden',
    bedTab: 'hidden',
  });
  return (
    <Formik
      validationSchema={props.schema}
      initialValues={{
        buildingname: '',
        buildinglabel: '',
        building: '',
        roomname: '',
        room: '',
        roomlabel: '',
        bedname: '',
        bed: '',
        bedlabel: '',
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values }) => (
        <Form>
          <div className={isTab.buildingTab}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Choose a building
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Please select an existing building. Or create a new one.
            </Typography>
            {!props.optionList && (
              <Field
                options={null}
                name="building"
                component={SelectFormField}
                id="standard-select-building"
                label="No building available"
                value={buildingValue}
                select
                variant="standard"
              />
            )}
            {props.optionList &&
              (!isCreated ? (
                <Field
                  options={props.optionList}
                  name="building"
                  component={SelectFormField}
                  id="standard-select-building"
                  label="Select a building"
                  value={buildingValue}
                  select
                  variant="standard"
                  onOpen={() => {
                    setIsCreated(false);
                    setIsSelected(true);
                  }}
                  onChange={(e) => {
                    setBuildingValue(e.target.value);
                    values.building = e.target.value;
                  }}
                />
              ) : (
                <Field
                  options={props.optionList}
                  name="building"
                  select
                  component={SelectFormField}
                  id="standard-select-building"
                  label="No building to select"
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
              className="absolute top-[7.5rem] right-[4rem] rounded bg-auto-white p-2 hover:text-light-important hover:ring-2  hover:ring-gray-700"
            >
              Create a new <span className="text-light-important">building</span>
            </button>
            {isCreated && !isSelected ? (
              <div className="mt-6">
                <Field
                  name="buildingname"
                  component={TextFormField}
                  required
                  id="buildingname-required"
                  label="Building Name"
                  helperText="Please type the name of your building"
                />
                <Field
                  name="buildinglabel"
                  component={TextFormField}
                  required
                  id="buildinglabel-required"
                  label="Building Label"
                  helperText="Please indicate the label of your building"
                />
              </div>
            ) : null}
            <button
              className="absolute bottom-[7.5rem] right-[4rem] rounded bg-light-important px-4 py-2 text-auto-white hover:bg-auto-black hover:text-light-important  "
              type="button"
              onClick={() =>
                setTab({ buildingTab: 'hidden', roomTab: '', bedTab: 'hidden' })
              }
            >
              Next
            </button>
          </div>
          <div className={isTab.roomTab}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Choose a room
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Please select an existing building. Or create a new one.
            </Typography>
            {!props.optionList && (
              <Field
                options={null}
                name="room"
                component={SelectFormField}
                id="standard-select-room"
                label="No room available"
                value={roomValue}
                select
                variant="standard"
              />
            )}
            {props.optionList &&
              (!isCreated ? (
                <Field
                  options={props.optionList}
                  name="room"
                  component={SelectFormField}
                  id="standard-select-room"
                  label="Select a room"
                  value={roomValue}
                  select
                  variant="standard"
                  onOpen={() => {
                    setIsCreated(false);
                    setIsSelected(true);
                  }}
                  onChange={(e) => {
                    setRoomValue(e.target.value);
                    values.room = e.target.value;
                  }}
                />
              ) : (
                <Field
                  options={props.optionList}
                  name="room"
                  select
                  component={SelectFormField}
                  id="standard-select-room"
                  label="No room to select"
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
              className="absolute top-[7.5rem] right-[4rem] rounded bg-auto-white p-2 hover:text-light-important hover:ring-2  hover:ring-gray-700"
            >
              Create a new <span className="text-light-important">room</span>
            </button>
            {isCreated && !isSelected ? (
              <div className="mt-6">
                <Field
                  name="roomname"
                  component={TextFormField}
                  required
                  id="roomname-required"
                  label="Room Name"
                  helperText="Please type the name of your room"
                />
                <Field
                  name="roomlabel"
                  component={TextFormField}
                  required
                  id="roomlabel-required"
                  label="Room Label"
                  helperText="Please indicate the label of your room"
                />
              </div>
            ) : null}
            <button
              className="absolute bottom-[7.5rem] left-[4rem] rounded bg-light-important px-4 py-2 text-auto-white hover:bg-auto-black hover:text-light-important"
              type="button"
              onClick={() =>
                setTab({ buildingTab: '', roomTab: 'hidden', bedTab: 'hidden' })
              }
            >
              Back
            </button>
            <button
              className="absolute bottom-[7.5rem] right-[4rem] rounded bg-light-important px-4 py-2 text-auto-white hover:bg-auto-black hover:text-light-important"
              type="button"
              onClick={() =>
                setTab({ buildingTab: 'hidden', roomTab: 'hidden', bedTab: '' })
              }
            >
              Next
            </button>
          </div>
          <div className={isTab.bedTab}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Choose a bed
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Please select an existing bed. Or create a new one.
            </Typography>
            {!props.optionList && (
              <Field
                options={null}
                name="bed"
                component={SelectFormField}
                id="standard-select-bed"
                label="No bed available"
                value={bedValue}
                select
                variant="standard"
              />
            )}
            {props.optionList &&
              (!isCreated ? (
                <Field
                  options={props.optionList}
                  name="bed"
                  component={SelectFormField}
                  id="standard-select-bed"
                  label="Select a bed"
                  value={bedValue}
                  select
                  variant="standard"
                  onOpen={() => {
                    setIsCreated(false);
                    setIsSelected(true);
                  }}
                  onChange={(e) => {
                    setBedValue(e.target.value);
                    values.bed = e.target.value;
                  }}
                />
              ) : (
                <Field
                  options={props.optionList}
                  name="bed"
                  select
                  component={SelectFormField}
                  id="standard-select-bed"
                  label="No bed to select"
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
              className="absolute top-[7.5rem] right-[4rem] rounded bg-auto-white p-2 hover:text-light-important hover:ring-2  hover:ring-gray-700"
            >
              Create a new <span className="text-light-important">bed</span>
            </button>
            {isCreated && !isSelected ? (
              <div className="mt-6">
                <Field
                  name="bedname"
                  component={TextFormField}
                  required
                  id="bedname-required"
                  label="Bed Name"
                  helperText="Please type the name of your bed"
                />
                <Field
                  name="bedlabel"
                  component={TextFormField}
                  required
                  id="bedlabel-required"
                  label="Bed Label"
                  helperText="Please indicate the label of your bed"
                />
              </div>
            ) : null}
            <button
              className="absolute bottom-[7.5rem] left-[4rem] rounded bg-light-important px-4 py-2 text-auto-white hover:bg-auto-black hover:text-light-important"
              type="button"
              onClick={() =>
                setTab({ buildingTab: 'hidden', roomTab: '', bedTab: 'hidden' })
              }
            >
              Back
            </button>
            <button
              className="absolute bottom-[7.5rem] right-[4rem] rounded bg-light-important px-4 py-2 text-auto-white hover:bg-auto-black hover:text-light-important"
              type="submit"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FacilitiesContent;
