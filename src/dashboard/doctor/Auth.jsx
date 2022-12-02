import TextFormField from '@/shared/utilities/form/TextFormField.jsx';
import React, { useState } from 'react';
import { Field, Form, Formik, setNestedObjectValues } from 'formik';
import { Typography } from '@mui/material';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  let imgStyle = '';
  if (isSignUp) {
    imgStyle = '-left-[1rem]';
  } else {
    imgStyle = 'left-[28.6rem]';
  }
  console.log(isSignUp)
  return (
    <div className=" flex h-screen w-screen items-center justify-center bg-gradient-to-r from-black via-gray-600 to-black">
      <div className="relative grid h-[80%] w-[60%] grid-cols-2  overflow-hidden rounded-xl border-2 border-black bg-gradient-to-t from-white to-cyan-50">
        <Login setIsSignUp={setIsSignUp} />
        <Signup setIsSignUp={setIsSignUp} />
        <div className={`${imgStyle} absolute top-0 z-30 h-[100%] w-[51%] transition-all duration-1000 ease-in-out rounded-xl overflow-hidden` }>
          <img className='w-[100%] h-[100%]' src="../../../assets/img/login.jpg" alt="Login" />
        </div>
      </div>
    </div>
  );
};

const Login = (props) => {
  return (
    <div className="z-10 flex items-center justify-center">
      <div className="-ml-[2rem] flex max-w-[15rem] flex-col items-start justify-center gap-4">
        <div className="text-verylarge font-bold text-blue-400">Login</div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, excepturi?
        </div>
        <div className="-mt-8">
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
                <div className="relative">
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
                  <div className="absolute right-0 mt-4 flex flex-col items-end justify-start gap-2">
                    <button
                      className=" rounded bg-blue-600 px-6 py-2 text-auto-white hover:bg-blue-800 hover:font-bold hover:text-light-important "
                      type="submit"
                      onClick={() => {
                        setTimeout(addDevice, 1000);
                      }}
                    >
                      Log in
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className="absolute bottom-0 mb-8">
            <div className="font-bold text-blue-600">Don't have an account?</div>
            <button
              className=" rounded bg-blue-600 px-6 py-2 text-auto-white hover:bg-blue-800 hover:font-bold hover:text-light-important "
              type="submit"
              onClick={() => {
                props.setIsSignUp(true);
              }}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const Signup = (props) => {
  const [role, setRole] = useState({patient:true, nurse:false,doctor:false})
  return (
    <div className="z-10 flex items-center justify-center">
      <div className="mb-[12rem] -ml-[2rem] flex max-w-[15rem] flex-col items-start justify-center gap-4">
        <div className="text-verylarge font-bold text-blue-400">Sign up</div>
        <div>
          What role are you signing up as?
        </div>
        <div className="-mt-8">
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
                <div className="relative">
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
                  <div className="absolute right-0 mt-4 flex flex-col items-end justify-start gap-2">
                    <button
                      className=" rounded bg-blue-600 px-6 py-2 text-auto-white hover:bg-blue-800 hover:font-bold hover:text-light-important "
                      type="submit"
                      onClick={() => {
                        setTimeout(addDevice, 1000);
                      }}
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className="absolute bottom-0 mb-8">
            <div className="font-bold text-blue-600">Already have an account></div>
            <button
              className=" rounded bg-blue-600 px-6 py-2 text-auto-white hover:bg-blue-800 hover:font-bold hover:text-light-important "
              type="submit"
              onClick={() => {
                props.setIsSignUp(false);
              }}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
