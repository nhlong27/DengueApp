import React, { useContext, useEffect, useState } from 'react';
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
// import { AppContext } from '@/dashboard/doctor/App';
import { InfinitySpin } from 'react-loader-spinner';
import MultipleSelectChip from '@/shared/utilities/form/MultiSelect';
import { BiRefresh } from 'react-icons/bi';

const nurse_schema = yup.object({
  fname: yup.string().min(1).max(30),
  lname: yup.string().min(1).max(30),
  email: yup.string().min(1).max(30),
});

const NurseSearchCreate = (props) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [roomLoading, setRoomLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleRoomLoad = async () => {
    try {
      setRoomLoading(true);
      let { data: ROOM, error } = await supabase.from('ROOM').select('*');
      if (error) throw error;
      setRooms(ROOM);
      console.log('get rooms for assigning nurse success!');
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      setRoomLoading(false);
    }
  };
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      let now = Date.now();
      await supabase.from('PERSON').insert([{ Per_Ssn: now, D_Ssn: session.user.id }]);
      await supabase.from('NURSE').insert([
        {
          Fname: values.fname,
          Lname: values.lname,
          Per_Ssn: now,
          Email: values.email,
          Assign: values.rooms ? values.rooms.join() : 'No',
        },
      ]);
      let { data: NURSE, error } = await supabase
        .from('NURSE')
        .select('*')
        .eq('Per_Ssn', now);
      for (let room of values.rooms) {
        await supabase
          .from('IS_ASSIGNED_TO')
          .insert([{ N_Ssn: NURSE[0].N_Ssn, R_Number: room }]);
      }
      if (error) throw error;
      console.log('add nurse success!');
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      console.log('remember to send mail later');
      // let { data, error } = await supabase.auth.signInWithOtp({
      //   email: 'iamfallers@gmail.com',
      // });
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
            handleRoomLoad();
          }}
        >
          Create
        </button>
        {roomLoading ? (
          <div className="fixed flex h-screen w-screen items-center justify-center">
            <InfinitySpin width="500" color="#475569" />
          </div>
        ) : (
          <TransitionsModal open={open}>
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-[1rem] -right-[1rem] rounded-full bg-white"
            >
              <AiOutlineCloseCircle size={30} />
            </button>
            <FacilityFormContent
              optionList={rooms}
              schema={nurse_schema}
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
  const [rooms, setRooms] = React.useState([]);
  return (
    <Formik
      validateOnChange={false}
      validationSchema={props.schema}
      initialValues={{
        fname: '',
        lname: '',
        email: '',
      }}
      onSubmit={(values) => {
        props.handleSubmit({ ...values, rooms: rooms });
      }}
    >
      {({ values }) => (
        <Form>
          <div className="flex flex-col items-start justify-start">
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add a nurse
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Please type the first and last name of the nurse
            </Typography>
            <div className={`mt-6`}>
              <Field
                style={{ width: 150, marginRight: 20 }}
                name="fname"
                component={TextFormField}
                required
                variant="filled"
                id="fname-required"
                label={`First Name`}
                helperText={`Please type the first name`}
              />
              <Field
                variant="filled"
                style={{ width: 200 }}
                name="lname"
                component={TextFormField}
                required
                id="lname-required"
                label={`Last Name`}
                placeholder={`Temperature Sensor`}
                helperText={`Please indicate the last name`}
              />
              <Field
                name="email"
                component={TextFormField}
                required
                id="email-required"
                label={`Email`}
                placeholder={`nurse@mail.com`}
                helperText={`Please type the email`}
              />
              <MultipleSelectChip
                personName={rooms}
                setPersonName={setRooms}
                names={props.optionList}
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
export default NurseSearchCreate;
