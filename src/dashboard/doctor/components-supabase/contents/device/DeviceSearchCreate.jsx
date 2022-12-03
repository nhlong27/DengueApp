import React, { useContext, useState } from 'react';
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

const device_schema = yup.object({
  id: yup.string().nullable(),
  label: yup.string().min(1).max(30),
  type: yup.string().min(1).max(30),
});

const DeviceSearchCreate = (props) => {
  const {session} = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);
  const handleClose = () => setClose(false);
  const handleOpen = () => setOpen(true);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await supabase
        .from('DEVICE')
        .insert([{ D_Ssn: session.user.id, Label: values.label, Type: values.type }]);
      if (error) throw error;
      console.log('add device success!');
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
        <SearchBar value={props.value} setValue={props.setValue} />
      </div>
      <div className="ml-8 flex h-[80%] w-[15%] items-center justify-center rounded-[3rem] bg-blue-600 py-2 shadow-lg">
        <button
          className="duration-600  rounded bg-blue-600 text-[18px] tracking-widest text-white transition-all hover:text-[20px] hover:tracking-[4px]"
          onClick={handleOpen}
        >
          Create
        </button>
        <TransitionsModal open={open}>
          <button
            onClick={() => setOpen(false)}
            className="absolute -top-[1rem] -right-[1rem] rounded-full bg-white"
          >
            <AiOutlineCloseCircle size={30} />
          </button>
          <FacilityFormContent
            optionList={null}
            schema={device_schema}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </TransitionsModal>
      </div>
    </>
  );
};

const FacilityFormContent = (props) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  // console.log('List of options');
  // console.log(props.optionList);
  return (
    <Formik
      validateOnChange={false}
      validationSchema={props.schema}
      initialValues={{
        label: '',
        type: '',
        id: '',
      }}
      onSubmit={(values) => {
        props.handleSubmit({ ...values });
      }}
    >
      {({ values }) => (
        <Form>
          <div className="flex flex-col items-start justify-start">
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add a device
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Please select an existing device. Or create a new one.
            </Typography>
            <div className="mt-4">
              {!props.optionList && (
                <Field
                  style={{ height: 20, width: 200, margin: 0 }}
                  options={null}
                  name="id"
                  component={SelectFormField}
                  id="standard-select"
                  label="None available"
                  defaultValue=""
                  variant="standard"
                />
              )}

              {props.optionList &&
                (!isCreated ? (
                  <Field
                    options={props.optionList}
                    name="id"
                    component={SelectFormField}
                    id="standard-select"
                    label="Select one"
                    variant="standard"
                    onOpen={() => {
                      setIsCreated(false);
                      setIsSelected(true);
                    }}
                    onChange={(e) => {
                      values.id = e.target.value;
                    }}
                  />
                ) : (
                  <Field
                    options={props.optionList}
                    name="id"
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
            </div>
            <button
              onClick={() => {
                setIsCreated(true);
                setIsSelected(false);
              }}
              className="mt-8 rounded bg-blue-600 p-2 text-white transition-all duration-500 hover:px-4"
            >
              Create new
            </button>
            {isCreated && !isSelected ? (
              <div className={`mt-6`}>
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
export default DeviceSearchCreate;
