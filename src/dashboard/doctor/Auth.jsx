import TextFormField from '@/shared/utilities/form/TextFormField.jsx';
import React, { useState, useEffect } from 'react';
import { Field, Form, Formik, setNestedObjectValues } from 'formik';
import { Typography } from '@mui/material';
import * as yup from 'yup';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { useNavigate } from 'react-router';
import Account from './components-supabase/Account';

const loginSchema = yup.object({
  username: yup.string().required().max(15).min(5),
  password: yup.string().required().min(5).max(30),
  email: yup.string().email(),
});
const signupSchema = yup.object({
  username: yup.string().required().max(15).min(5),
  password: yup.string().required().min(5).max(30),
  email: yup.string().email(),
});

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  let imgStyle = '';
  if (isSignUp) {
    imgStyle = '-left-[0.5rem]';
  } else {
    imgStyle = 'left-[28.6rem]';
  }

  return (
    <div className=" flex h-screen w-screen items-center justify-center bg-black">
      <div className="relative grid h-[80%] w-[60%] grid-cols-2  rounded-xl border-2 border-black bg-gradient-to-t from-white to-cyan-50 ring-8  ring-blue-600  ring-offset-4 ring-offset-black">
        <Login setIsSignUp={setIsSignUp} schema={loginSchema} />
        <Signup setIsSignUp={setIsSignUp} schema={signupSchema} />
        <div
          className={`${imgStyle} absolute top-0 z-30 h-[100%] w-[51%] overflow-hidden rounded-xl ring-8 ring-blue-600 transition-all duration-1000 ease-in-out`}
        >
          <img
            className="h-[100%] w-[100%] "
            src="../../../assets/img/login.jpg"
            alt="Login"
          />
        </div>
      </div>
    </div>
  );
};

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogIn = async (credentials) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword(credentials);
      if (error) throw error;
      console.log('login success!');
      navigate('/pages/dashboard/doctor/index.html');
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-8 flex items-start justify-center">
      <div className="-ml-[2rem] flex max-w-[15rem] flex-col items-start justify-center gap-4">
        <div className="text-verylarge font-bold text-blue-600">Login</div>
        <div>Log in as Doctor, Nurse or Patient</div>
        <div className="-mt-8">
          <Formik
            validateOnChange={false}
            validationSchema={props.schema}
            initialValues={{
              password: '',
              email: '',
            }}
            onSubmit={(values) => {
              handleLogIn({ ...values });
            }}
          >
            {({ values }) => (
              <Form>
                <div className="relative">
                  <div className="mt-6">
                    <Field
                      name="email"
                      component={TextFormField}
                      required
                      id="login-email-required"
                      label={`Email`}
                      placeholder={'email'}
                      helperText={`Please type your email`}
                    />
                    <Field
                      name="password"
                      component={TextFormField}
                      required
                      id="login-password-required"
                      type="password"
                      label={`Password`}
                      autoComplete="current-password"
                      placeholder={'password'}
                      helperText={`Please type your password`}
                    />
                  </div>
                  <div className="absolute right-0 mt-4 flex flex-col items-end justify-start gap-2">
                    <button
                      className=" rounded bg-blue-600 px-6 py-2 text-auto-white hover:bg-blue-800 hover:font-bold hover:text-light-important "
                      type="submit"
                      onClick={() => {
                        handleLogIn({ ...values });
                      }}
                    >
                      Log in
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className="absolute bottom-0 mb-8 border-t-4 border-l-gray-900 pt-4">
            {loading ? (
              <div>Logging in...</div>
            ) : (
              <>
                <div className="font-bold">Don't have an account?</div>
                <button
                  className=" rounded bg-auto-white px-6 py-2 font-bold text-blue-600 hover:bg-blue-200 hover:font-bold hover:text-light-important "
                  type="submit"
                  onClick={() => {
                    props.setIsSignUp(true);
                  }}
                >
                  Sign up
                </button>
                <button
                  className=" rounded bg-white px-6 py-2 text-blue-600 hover:font-bold"
                  type="submit"
                >
                  <a href="../../../index.html">Or back to home page</a>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const Signup = (props) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (credentials) => {
    console.log(credentials);
    try {
      setLoading(true);
      let { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
      });
      if (error) throw error;
      console.log('signup success!');
      console.log(data);

      alert('Activate your account by clicking the link in your email');
      // const { data } = await supabase
      //   .from('DOCTOR')
      //   .insert([{ Fname: credentials.fname, Lname:  credentials.lname }]);
    } catch (error) {
      console.log(error.error_description || error.message);
    }
  };

  const [role, setRole] = useState({ patient: true, nurse: false, doctor: false });
  return (
    <div className="z-10 flex items-center justify-center">
      <div className="mb-[12rem] -ml-[2rem] mt-4 flex max-w-[15rem] flex-col items-start justify-center gap-4">
        <div className="flex w-[20rem] flex-wrap gap-4">
          <div className="text-verylarge font-bold text-blue-600">
            Sign up <span className="text-base font-normal text-black">Who are you?</span>
          </div>

          <div className="flex w-[15rem] justify-center divide-x-2 divide-blue-600 rounded-sm ring-2 ring-blue-600 ring-offset-4">
            <button
              className={` rounded-lg p-2 text-blue-600 hover:bg-blue-200 focus:bg-blue-200 focus:font-bold`}
              onClick={() => {
                setRole({ patient: true, nurse: false, doctor: false });
              }}
            >
              Patient
            </button>
            <button
              className={` rounded-lg p-2 text-blue-600 hover:bg-blue-200 focus:bg-blue-200 focus:font-bold`}
              onClick={() => {
                setRole({ patient: false, nurse: false, doctor: true });
              }}
            >
              Doctor
            </button>
            <button
              className={` rounded-lg p-2 text-blue-600 hover:bg-blue-200 focus:bg-blue-200 focus:font-bold`}
              onClick={() => {
                setRole({ patient: false, nurse: true, doctor: false });
              }}
            >
              Nurse
            </button>
          </div>
        </div>
        <div className="-mt-10">
          <Formik
            validateOnChange={false}
            validationSchema={props.schema}
            initialValues={{
              fname: '',
              lname: '',
              password: '',
              email: '',
            }}
            onSubmit={(values) => {
              handleSignUp({ ...values });
            }}
          >
            {({ values }) => (
              <Form>
                <div className="relative">
                  <div className="mt-6">
                    <div className="flex w-[30rem] gap-4 p-2">
                      <Field
                        name="fname"
                        component={TextFormField}
                        required
                        style={{ width: 150 }}
                        variant="standard"
                        id="fname-required"
                        label={`First name`}
                        placeholder={'John'}
                      />
                      <Field
                        name="lname"
                        component={TextFormField}
                        required
                        variant="standard"
                        style={{ width: 150 }}
                        id="lname-required"
                        label={`Last name`}
                        placeholder={'Scott'}
                      />
                    </div>
                    <Field
                      name="email"
                      component={TextFormField}
                      required
                      id="signup-email-required"
                      label={`Email`}
                      placeholder={'email'}
                      helperText={`Please type your email`}
                    />
                    <Field
                      name="password"
                      component={TextFormField}
                      required
                      id="signup-password-required"
                      label={`Password`}
                      type="password"
                      placeholder={'password'}
                      helperText={`Please type your password`}
                    />
                  </div>
                  <div className="absolute right-[10rem] mt-4 flex flex-col items-end justify-start gap-2">
                    <button
                      className=" rounded bg-blue-600 px-6 py-2 text-auto-white hover:bg-blue-800 hover:font-bold hover:text-light-important "
                      type="submit"
                      onClick={() => {
                        console.log({ ...values });
                        handleSignUp({ ...values });
                      }}
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className="absolute bottom-0 mb-8 border-t-4 border-l-gray-900 pt-4">
            {loading ? (
              <div>Signing up...</div>
            ) : (
              <>
                <div className="font-bold">Already have an account?</div>
                <button
                  className=" rounded bg-auto-white px-6 py-2 font-bold text-blue-600 hover:bg-blue-200 hover:font-bold hover:text-light-important "
                  type="submit"
                  onClick={() => {
                    props.setIsSignUp(false);
                  }}
                >
                  Log in
                </button>
                <button
                  className=" rounded bg-white px-6 py-2 text-blue-600 hover:font-bold"
                  type="submit"
                >
                  <a href="../../../index.html">Or back to home page</a>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
