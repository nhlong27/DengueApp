import React, { useState, useEffect } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import TextFormField from '@/shared/utilities/form/TextFormField.jsx';
import { Field, Form, Formik, setNestedObjectValues } from 'formik';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import Account from '../doctor/components-supabase/profile/Account';
import * as yup from 'yup';
import { useAtom } from 'jotai';
import { logInAsAtom } from '@/dashboard/Auth';

const loginSchema = yup.object({
  username: yup.string().max(15).min(5),
  password: yup.string().required().min(6).max(30),
  email: yup.string().email(),
});

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [logInAs, setLogInAs] = useAtom(logInAsAtom);
  const [loginErrorHelper, setLoginErrorHelper] = useState('Logging in');

  const navigate = useNavigate();

  const handleLogIn = async (credentials) => {
    try {
      setLoading(true);
      setLoginErrorHelper(() => 'Logging in');
      let isUser = false;

      if (logInAs === 'doctor') {
        console.log('finding doctor..');
        const { data: DOCTOR } = await supabase
          .from('DOCTOR')
          .select('*')
          .eq('Email', credentials.email)
          .single();
        console.log(DOCTOR);
        isUser = DOCTOR && true;
        console.log(isUser);
      } else if (logInAs === 'nurse') {
        console.log('finding nurse..');
        const { data: NURSE } = await supabase
          .from('NURSE')
          .select('*')
          .eq('Email', credentials.email)
          .single();
        isUser = NURSE && true;
      } else if (logInAs === 'patient') {
        console.log('finding patient..');
        const { data: PATIENT } = await supabase
          .from('PATIENT')
          .select('*')
          .eq('Email', credentials.email)
          .single();
        isUser = PATIENT && true;
      }

      if (isUser) {
        console.log('login success!');
        const { data: USER, error } = await supabase.auth.signInWithPassword(credentials);
        setLoading(false);
        navigate('/dashboard/');
      } else {
        setLoginErrorHelper(() => `User doesn't exist`);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error.error_description || error.message);
      setLoginErrorHelper(() => error.error_description || error.message);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    return () => {
      setLoading(null);
    };
  }, []);
  return (
    <div className="ml-8 mt-8 flex w-[31rem] items-start justify-center">
      <div className="-ml-[4rem] flex max-w-[25rem] flex-col items-start justify-center gap-4">
        <div className="flex w-[25rem] items-center justify-start gap-4">
          <div className="text-verylarge font-bold text-blue-600">
            Log in <span className="text-large font-normal text-blue-600">as</span>
          </div>

          <div className="flex w-[13rem] justify-center divide-x-2 divide-blue-600 rounded-sm ring-2 ring-blue-600 ring-offset-4">
            <button
              className={`${
                logInAs === 'doctor' && 'bg-blue-200 font-bold'
              } rounded-lg p-2 text-blue-600`}
              onClick={() => {
                setLogInAs(() => 'doctor');
              }}
            >
              Doctor
            </button>
            <button
              className={`${
                logInAs === 'nurse' && 'bg-blue-200 font-bold'
              } rounded-lg p-2 text-blue-600 hover:bg-blue-200 focus:bg-blue-200 focus:font-bold`}
              onClick={() => {
                setLogInAs(() => 'nurse');
              }}
            >
              Nurse
            </button>
            <button
              className={`${
                logInAs === 'patient' && 'bg-blue-200 font-bold'
              } rounded-lg p-2 text-blue-600 hover:bg-blue-200 focus:bg-blue-200 focus:font-bold`}
              onClick={() => {
                setLogInAs(() => 'patient');
              }}
            >
              Patient
            </button>
          </div>
        </div>
        <div className="mt-4">
          <div>
            You're logging in as{' '}
            <span className="font-bold text-blue-600">{logInAs}</span>{' '}
          </div>
          {logInAs === 'nurse' && (
            <div className="text-[14px]">
              You need a doctor to create an account for you. <br /> Click the{' '}
              <span className="text-blue-600">confirmation link</span> in your email to
              activate.
              <br />
              The default password is "password". Remember to change this after logging
              in.
            </div>
          )}
          {logInAs === 'patient' && (
            <div className="text-[14px]">
              You need a doctor to create an account for you. <br /> Click the{' '}
              <span className="text-blue-600">confirmation link</span> in your email to
              activate.
              <br />
              The default password is "password". Remember to change this after logging
              in.
            </div>
          )}

          <Formik
            validateOnChange={false}
            validationSchema={loginSchema}
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
                      style={{ padding: 0, margin: 0 }}
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
                      style={{ paddingY: 0, margin: 0 }}
                    />
                  </div>
                  <div className="absolute right-4 -mt-8 flex flex-col items-end justify-start gap-2">
                    <button
                      className=" rounded bg-blue-600 px-6 py-2 text-auto-white ring-2 ring-gray-300 hover:bg-blue-700 hover:ring-black "
                      type="submit"
                    >
                      Log in
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className="absolute bottom-0 mb-12 border-t-4 border-l-gray-900 pt-4">
            {loading ? (
              <div>
                <span
                  className={`text-[18px] font-bold ${
                    loginErrorHelper === 'Logging in' ? 'text-blue-600' : 'text-red-600'
                  }`}
                >
                  {loginErrorHelper}
                </span>
                <InfinitySpin width="100" color="#475569" />
              </div>
            ) : (
              <>
                <div className="mb-4 font-bold">Don't have a doctor account?</div>
                <button
                  className=" mr-4 rounded bg-auto-white px-6 py-2 font-bold text-blue-600 ring-2 ring-gray-300 hover:ring-black  "
                  type="submit"
                  onClick={() => {
                    props.setIsSignUp(true);
                  }}
                >
                  Sign up
                </button>
                <button
                  className=" rounded bg-auto-white px-6 py-2 text-blue-600 hover:font-bold"
                  type="submit"
                >
                  <a href="../../../">Or back to home page</a>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
