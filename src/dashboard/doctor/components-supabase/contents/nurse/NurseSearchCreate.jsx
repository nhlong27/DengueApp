import React, { useContext, useEffect, useState } from 'react';
import { Field, Form, Formik, setNestedObjectValues } from 'formik';
import { Typography } from '@mui/material';
import TransitionsModal from '@/shared/utilities/Modal';
import SelectFormField from '@/shared/utilities/form/SelectFormField';
import TextFormField from '@/shared/utilities/form/TextFormField';
import { client } from '@/shared/api/initClient_tenant';
import * as yup from 'yup';
import SearchBar from '../../components/SearchBar';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { supabase } from '@/shared/api/supabase/supabaseClient';
// import { AppContext } from '@/dashboard/doctor/App';
import { InfinitySpin } from 'react-loader-spinner';
import MultipleSelectChip from '@/shared/utilities/form/MultiSelect';
import { BiRefresh } from 'react-icons/bi';
import { userSession } from '@/dashboard/Auth';
import { useAtom } from 'jotai';
import { facilityList } from '@/dashboard/doctor/App';

// const nurse_schema = yup.object({
//   fname: yup.string().min(1).max(30).required(),
//   lname: yup.string().min(1).max(30).required(),
//   email: yup.string().email().required(),
//   password: yup.string().min(6).max(30).nullable()
// });

const NurseSearchCreate = (props) => {
  const [session] = useAtom(userSession);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [facilities, setFacilities] = useAtom(facilityList);

  const handleOpen = () => setOpen(true);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      console.log('registering nurse..');

      const { data: USER } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      console.log('activation mail sent!');
      const {error} = await supabase.from('NURSE').insert([
        {
          N_Ssn: USER.user.id,
          Fname: values.fname,
          Lname: values.lname,
          Email: values.email,
          Assign: values.rooms ? values.rooms.join() : 'No',
          D_Ssn: session.user.id,
        },
      ]);
      if (error) throw error;
      console.log('updating nurse-facility relationship..');

      for (let room of values.rooms) {
        await supabase
          .from('IS_ASSIGNED_TO')
          .insert([{ N_Ssn: USER.user.id, R_Number: room }]);
      }

      console.log('add nurse success!');
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
        <SearchBar search={props.search} setSearch={props.setSearch} />
      </div>
      <div className="ml-8 flex h-[80%] w-[15%] items-center justify-center rounded-[3rem] bg-blue-600 py-2 shadow-lg ring-2 ring-black hover:bg-blue-700">
        <button
          className="duration-600 rounded text-[18px] tracking-widest text-white transition-all"
          onClick={() => {
            handleOpen();
          }}
        >
          Create
        </button>
        <TransitionsModal open={open}>
          <button
            onClick={() => setOpen(false)}
            className="absolute -top-[1rem] -right-[1rem] rounded-full bg-auto-white"
          >
            <AiOutlineCloseCircle size={30} />
          </button>
          <FacilityFormContent
            optionList={Object.keys(facilities)}
            // schema={nurse_schema}
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
  const [rooms, setRooms] = React.useState([]);
  return (
    <Formik
      validateOnChange={false}
      // validationSchema={props.schema}
      initialValues={{
        fname: '',
        lname: '',
        email: '',
        password: 'password',
      }}
      onSubmit={(values) => {
        props.handleSubmit({ ...values, rooms: rooms });
      }}
    >
      {({ values }) => (
        <Form>
          <div className="flex flex-col items-start justify-start">
            <div className="mb-4 text-large font-bold tracking-wider text-blue-500">
              Register a new nurse
            </div>
            <div className="text-[18px] text-blue-500">
              Please fill in all the necessary information.
            </div>
            <div className={`mt-6`}>
              <div className="flex items-center justify-start">
                <Field
                  style={{ width: 200, marginRight: 20 }}
                  name="fname"
                  component={TextFormField}
                  required
                  variant="filled"
                  id="fname-required"
                  label={`First Name`}
                  placeholder={'Mary'}
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
                  placeholder={`Rose`}
                  helperText={`Please indicate the last name`}
                />
              </div>
              <div className="flex items-center justify-center">
                <Field
                  name="email"
                  component={TextFormField}
                  required
                  id="email-required"
                  label={`Email`}
                  placeholder={`nurse@mail.com`}
                  helperText={`Please type the email`}
                  style={{ width: 200, marginRight: 20 }}
                />
                <Field
                  name="password"
                  component={TextFormField}
                  id="password"
                  label={`Password`}
                  helperText={`The default password is "password" if not specified.`}
                  style={{ width: 200 }}
                />
              </div>
              <div className="text-[18px] text-blue-500">Assign a room/rooms</div>
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
