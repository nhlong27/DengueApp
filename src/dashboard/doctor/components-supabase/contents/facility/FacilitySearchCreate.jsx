import React, { useEffect, useState, useContext } from 'react';
import * as yup from 'yup';
import { Field, Form, Formik, setNestedObjectValues } from 'formik';
import { Typography } from '@mui/material';
import TransitionsModal from '@/shared/utilities/Modal';
import SelectFormField from '@/shared/utilities/form/SelectFormField';
import TextFormField from '@/shared/utilities/form/TextFormField';
import SearchBar from '../../SearchBar';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { InfinitySpin } from 'react-loader-spinner';
// import { AppContext } from '@/dashboard/doctor/App';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BiRefresh } from 'react-icons/bi';

var tabSelectedInput = {};
const facility_schema = yup.object({
  id: yup.string().min(1).max(30),
  number: yup.string().min(1).max(30),
});

const FacilitySearchCreate = (props) => {
  const [loading, setLoading] = useState(false);
  const [roomLoading, setRoomLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleOpen2 = () => setOpen2(true);
  const handleRoomLoad = async () => {
    try {
      setRoomLoading(true);
      let { data: ROOM, error } = await supabase.from('ROOM').select('*');
      if (error) throw error;
      setRooms(ROOM);
      console.log('get rooms for create bed success!');
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      setRoomLoading(false);
    }
  };
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      // let now = Date.now();
      // await supabase.from('FACILITY').insert([{ Fac_Number: now }]);
      if (values.id !== '') {
        await supabase
          .from('BED')
          .insert([{ B_Number: values.number, R_Number: values.id }]);
      } else {
        const { data, error } = await supabase
          .from('ROOM')
          .insert([{ R_Number: values.number }]);
      }
      console.log('add success!');
      if (error) throw error;
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      setLoading(false);
      setOpen1(false);
      setOpen2(false);
    }
  };
  return (
    <>
      <div className="ml-8 flex h-[80%] w-[50%] items-center justify-center rounded-[3rem] bg-black p-2 shadow-lg">
        <SearchBar search={props.search} setSearch={props.setSearch} />
      </div>
      <div className="ml-6 flex h-[80%] w-[15%]  items-center justify-center rounded-l-[3rem] bg-blue-600 py-2 shadow-lg ring-2 ring-black hover:bg-blue-700">
        <button
          className="duration-600 w-[100%] rounded-[3rem] text-[18px] tracking-wider text-white transition-all "
          onClick={handleOpen1}
        >
          Create Room
        </button>

        <TransitionsModal open={open1}>
          <button
            onClick={() => setOpen1(false)}
            className="absolute -top-[1rem] -right-[1rem] rounded-full bg-white"
          >
            <AiOutlineCloseCircle size={30} />
          </button>
          <FacilityFormContent
            optionList={null}
            schema={facility_schema}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </TransitionsModal>
      </div>
      <div className="flex h-[80%] w-[15%]  items-center justify-center rounded-r-[3rem] bg-blue-600 py-2 shadow-lg ring-2 ring-black hover:bg-blue-700">
        <button
          className="duration-600 w-[100%] rounded-[3rem]  text-[18px] tracking-wider text-white transition-all "
          onClick={() => {
            handleOpen2();
            handleRoomLoad();
          }}
        >
          Create Bed
        </button>

        {roomLoading ? (
          <div className="fixed flex h-screen w-screen items-center justify-center">
            <InfinitySpin width="500" color="#475569" />
          </div>
        ) : (
          <TransitionsModal open={open2}>
            <button
              onClick={() => setOpen2(false)}
              className="absolute -top-[1rem] -right-[1rem] rounded-full bg-white"
            >
              <AiOutlineCloseCircle size={30} />
            </button>
            <FacilityFormContent
              optionList={rooms}
              schema={facility_schema}
              handleSubmit={handleSubmit}
              loading={loading}
            />
          </TransitionsModal>
        )}
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
  return (
    <Formik
      validateOnChange={false}
      validationSchema={props.schema}
      initialValues={{
        number: '',
        id: '',
      }}
      onSubmit={(values) => {
        props.handleSubmit({ ...values });
      }}
    >
      {({ values }) => (
        <Form>
          <div>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {props.optionList ? 'Add a bed' : 'Add a room'}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Please add the number of the
              {props.optionList ? ' bed' : ' room'}
            </Typography>
            {props.optionList ? (
              <Field
                options={props.optionList}
                name="id"
                component={SelectFormField}
                id="standard-select"
                label="Select a room"
                defaultValue=""
                variant="standard"
                required
              />
            ) : null}
            <div className="mt-6">
              <Field
                name="number"
                component={TextFormField}
                required
                id="number-required"
                label={`${props.optionList ? 'Bed number' : 'Room number'}`}
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
                Submit
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FacilitySearchCreate;
