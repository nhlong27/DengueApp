import React, { useState, useEffect } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import Account from '../doctor/components-supabase/profile/Account';
import DoctorForm from './DoctorForm';

const Signup = (props) => {
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (credentials) => {
    try {
      setLoading(true);
      let { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
      });
      if (error) throw error;
      console.log('signup success!');

      await supabase.from('DOCTOR').insert([
        {
          Username: credentials.username,
          D_Ssn: data.user.id,
          Fname: credentials.fname,
          Lname: credentials.lname,
        },
      ]);

      console.log('initialize doctor success!');
    } catch (error) {
      console.log(error.error_description || error.message);
    }
  };

  return (
    <div className="ml-12 flex items-center justify-center">
      <div className="mb-[12rem] -ml-[2rem] mt-4 flex max-w-[15rem] flex-col items-start justify-center ">
        <div className="text-verylarge font-bold text-blue-600">
          Sign up <span className="text-large font-normal text-blue-600">as DOCTOR</span>
        </div>
        <div>
          <DoctorForm handleSignUp={handleSignUp} />
          <div className="absolute bottom-0 mb-12 border-t-4 border-l-gray-900 pt-4">
            {loading ? (
              <div>
                Signing up...
                <InfinitySpin width="20" color="#475569" />
                Activate your account by clicking the link in the
                <a
                  className="text-blue-600"
                  href="https://mail.google.com/mail/u/0/?tab=wm#inbox"
                >
                  {' '}
                  email you registered
                </a>
                .
              </div>
            ) : (
              <>
                <div className="mb-4 font-bold">Already have an account?</div>
                <button
                  className=" mr-4 rounded bg-auto-white px-6 py-2 font-bold text-blue-600 ring-2 ring-gray-300 hover:ring-black  "
                  type="submit"
                  onClick={() => {
                    props.setIsSignUp(false);
                  }}
                >
                  Log in
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

export default Signup;
