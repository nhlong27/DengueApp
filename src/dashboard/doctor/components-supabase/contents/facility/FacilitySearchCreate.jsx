import React, { useEffect, useState, useContext } from 'react';
import * as yup from 'yup';
import { Field, Form, Formik, setNestedObjectValues } from 'formik';
import { Typography } from '@mui/material';
import TransitionsModal from '@/shared/utilities/Modal';
import BasicSelect from '@/shared/utilities/form/BasicSelect';
import TextFormField from '@/shared/utilities/form/TextFormField';
import SearchBar from '../../components/SearchBar';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { InfinitySpin } from 'react-loader-spinner';
// import { AppContext } from '@/dashboard/doctor/App';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BiRefresh } from 'react-icons/bi';
import { useAtom } from 'jotai';
import { userSession } from '@/dashboard/Auth';
import { facilityList } from '@/dashboard/doctor/App';

var tabSelectedInput = {};
const facility_schema = yup.object({
  number: yup.string().min(1).max(30),
});

const FacilitySearchCreate = (props) => {
  const [loading, setLoading] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [facilities] = useAtom(facilityList)
  const [session] = useAtom(userSession)

  const handleOpen1 = () => setOpen1(true);
  const handleOpen2 = () => setOpen2(true);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      if (values.room !== '') {
        await supabase
          .from('BED')
          .insert([{ B_Number: values.number, R_Number: values.room, D_Ssn: session.user.id }]);
      } else {
        const { data, error } = await supabase
          .from('ROOM')
          .insert([{ R_Number: values.number, D_Ssn: session.user.id }]);
          if (error) throw error;
      }

      console.log('add room/bed success!');
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
          }}
        >
          Create Bed
        </button>


          <TransitionsModal open={open2}>
            <button
              onClick={() => setOpen2(false)}
              className="absolute -top-[1rem] -right-[1rem] rounded-full bg-white"
            >
              <AiOutlineCloseCircle size={30} />
            </button>
            <FacilityFormContent
              optionList={Object.keys(facilities)}
              schema={facility_schema}
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
  const [room, setRoom] = useState('')
  return (
    <Formik
      validateOnChange={false}
      validationSchema={props.schema}
      initialValues={{
        number: '',
      }}
      onSubmit={(values) => {
        props.handleSubmit({ ...values, room: room });
      }}
    >
      {({ values }) => (
        <Form>
          <div>
            <div className="mb-4 text-large font-bold tracking-wider text-blue-500">
              Add a new {props.optionList ? 'bed' : 'room'}
            </div>
            <div className="text-[18px] text-blue-500">
              Please fill in all the necessary information. <br />
              <div className="mt-4 text-[16px]">
                Noted: Health facility's (<span className="italic text-red-500">bed</span>{' '}
                or <span className="italic text-red-500">room</span>) label should follow
                the HS code of Medical Equipment in Vietnam, stipulated under Circular
                14/2018/TT-BYT dated on 15 May 2018 by Vietnam Ministry of health.
              </div>
            </div>

            {props.optionList ? (
              <BasicSelect
                input={room}
                setInput={setRoom}
                name={'Room'}
                list={props.optionList}
                style={{ width: 200 }}
              />
            ) : null}
            <div className="mt-2">
              <Field
                name="number"
                component={TextFormField}
                required
                id="number-required"
                label={`${props.optionList ? 'Bed Code' : 'Room Code'}`}
                variant='filled'
              />
            </div>
            {props.loading ? (
              <div className="absolute bottom-[2rem] right-[3rem]">
                <InfinitySpin width="300" color="#475569" />
              </div>
            ) : (
              <>
                <div className="mt-4 rounded-lg p-2 text-[16px] text-gray-500 ring-2 ring-gray-500">
                  Bed must be assigned to one and only one patient
                </div>
                <div className="mt-4 rounded-lg p-2 text-[16px] text-gray-500 ring-2 ring-gray-500">
                  Room must be assigned to one or many nurse
                </div>
                <button
                  className="absolute bottom-[3rem] right-[4rem] rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-400  "
                  type="submit"
                >
                  Submit
                </button>
              </>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FacilitySearchCreate;
