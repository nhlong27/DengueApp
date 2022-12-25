import TextFormField from '@/shared/utilities/form/TextFormField.jsx';
import { Field, Form, Formik, setNestedObjectValues } from 'formik';
import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';

const signupSchema = yup.object({
  username: yup.string().max(15).min(6),
  password: yup.string().required().min(6).max(15),
  email: yup.string().email(),
});

export default function DoctorForm(props) {
  return (
    <div className="flex flex-col items-start justify-center">
      <Formik
        validateOnChange={false}
        validationSchema={signupSchema}
        initialValues={{
          username: '',
          fname: '',
          lname: '',
          password: '',
          email: '',
        }}
        onSubmit={(values) => {
          props.handleSignUp({ ...values });
        }}
      >
        {({ values }) => (
          <Form>
            <div className="relative">
              <div className="flex flex-col items-start justify-start">
                <Field
                  name="username"
                  component={TextFormField}
                  style={{ width: 150, margin: 0, padding: 0 }}
                  variant="standard"
                  id="username-required"
                  label={`Username`}
                  placeholder={'DrJohn'}
                />
                <span className="text-[12px]">
                  A default username will be set if left blank
                </span>
                <div className="mb-4 flex w-[30rem]">
                  <Field
                    name="fname"
                    component={TextFormField}
                    required
                    style={{ width: 150, margin: 0, padding: 0, marginRight: 10 }}
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
                    style={{ width: 150, margin: 0, padding: 0 }}
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
                  style={{ margin: 0, padding: 0 }}
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
                  style={{ margin: 0, padding: 0 }}
                />
              </div>
              <div className="absolute right-[10rem] mt-4 flex flex-col items-end justify-start gap-2">
                <button
                  className=" rounded bg-blue-600 px-6 py-2 text-white ring-2 ring-gray-300 hover:bg-blue-700 hover:ring-black "
                  type="submit"
                >
                  Sign up
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
