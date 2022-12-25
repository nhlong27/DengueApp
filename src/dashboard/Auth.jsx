import React, { useState, useEffect } from 'react';
import loginImage from '../../assets/img/login.jpg';
import Signup from './auth/Signup';
import Login from './auth/Login';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { Provider, atom, useAtom } from 'jotai';
import AppNurse from './nurse/AppNurse';
import AppPatient from './patient/AppPatient';
import App from './doctor/App';

export const logInAsAtom = atom('doctor');
export const userSession = atom('');

const Auth = () => {
  const [logInAs] = useAtom(logInAsAtom);
  const [isSignUp, setIsSignUp] = useState(false);
  const [credentials, getCredentials] = useState({});
  const [session, setSession] = useAtom(userSession);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  let containerStyle = isSignUp ? 'w-[80%]' : 'w-[60%]';
  let imgStyle = '';
  if (isSignUp) {
    imgStyle = '-left-[0.5rem] w-[28rem]';
  } else {
    imgStyle = 'left-[28.6rem] w-[51%]';
  }

  if (session && logInAs === 'doctor') {
    return <App />;
  } else if (session && logInAs === 'nurse') {
    return <AppNurse />;
  } else if (session && logInAs === 'patient') {
    return <AppPatient />;
  } else {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-black">
        <div
          className={`${containerStyle} relative flex h-[80%] w-[60%]  rounded-xl border-2 border-black bg-auto-white transition-all duration-300`}
        >
          <Login setIsSignUp={setIsSignUp} session={session} />
          <Signup isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
          <div
            className={`${imgStyle} absolute top-0 z-30 h-[100%]  overflow-hidden rounded-xl ring-2 ring-black transition-all duration-1000 ease-in-out`}
          >
            <img
              className="h-[100%] w-[100%] bg-gradient-to-tr from-black to-gray-600"
              src={loginImage}
              alt=""
            />
          </div>
        </div>
      </div>
    );
  }
};

export default () => (
  <Provider>
    <Auth />
  </Provider>
);
