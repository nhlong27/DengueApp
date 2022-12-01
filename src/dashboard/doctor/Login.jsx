import TextFormField from '@/shared/utilities/form/TextFormField.jsx';
import React from 'react';
import { Field, Form, Formik, setNestedObjectValues } from 'formik';
import { Typography } from '@mui/material';

const Login = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-black via-gray-600 to-black">
      <div className="grid h-[80%] w-[60%] grid-cols-2 divide-x-4 divide-gray-900 overflow-hidden rounded-lg bg-gray-100">
        <div className="flex items-center justify-center">
          <div className="flex max-w-[15rem] flex-col items-start justify-center gap-8 mb-[6rem] -ml-[2rem]">
            <div className="text-verylarge font-bold text-blue-400">Login</div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
              excepturi?
            </div>
            <Formik
              validateOnChange={false}
              // validationSchema={props.schema}
              initialValues={{
                username: '',
                password: '',
                email: '',
              }}
              onSubmit={(values) => {
                // props.setValue({ ...values });
              }}
            >
              {({ values }) => (
                <Form>
                  <div className='relative'>
                    {/* <Typography id="transition-modal-title" variant="h6" component="h2">
                      Add a device
                    </Typography>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                      Please select an existing device. Or create a new one.
                    </Typography> */}

                    <div className="mt-6">
                      <Field
                        name="username"
                        component={TextFormField}
                        required
                        id="name-required"
                        label={`Username`}
                        placeholder={'username'}
                        // helperText={`Please type the id of your device`}
                      />
                      <Field
                        name="password"
                        component={TextFormField}
                        required
                        id="password-required"
                        label={`Password`}
                        placeholder={'password'}

                        // helperText={`Please type the name of your device`}
                      />
                      {/* <Field
                        name="type"
                        component={TextFormField}
                        required
                        id="type-required"
                        label={`Device Type`}
                        placeholder={`Temperature Sensor`}
                        helperText={`Please indicate the type of your device`}
                      /> */}
                    </div>
                    <button
                      className="absolute -bottom-[4rem] right-0 rounded bg-light-important px-6 py-2 text-auto-white hover:bg-auto-black hover:text-light-important  "
                      type="submit"
                      onClick={() => {
                        setTimeout(addDevice, 1000);
                      }}
                    >
                      Log in
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <img src="../../../assets/img/login.jpg" alt="Login" />
      </div>
    </div>
  );
};

export default Login;
