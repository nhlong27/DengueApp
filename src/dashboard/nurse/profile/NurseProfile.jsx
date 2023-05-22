import { useState, useEffect } from 'react';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { InfinitySpin } from 'react-loader-spinner';
import Avatar from './Avatar';
import { useAtom } from 'jotai';
import { userSession } from '@/dashboard/Auth';

const NurseProfile = (props) => {
  const [doctorId, setDoctorId] = useState('');
  const [session] = useAtom(userSession);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('Reset password');
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  // const [avatar_url, setAvatarUrl] = useState('avatar.png');

  useEffect(() => {
    getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
      setLoading(true);
      const { user } = session;

      let { data, error, status } = await supabase
        .from('NURSE')
        .select(`Fname, Lname, D_Ssn`)
        .eq('N_Ssn', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setLastName(data.Lname);
        setFirstName(data.Fname);
        setDoctorId(data.D_Ssn);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      const { user } = session;

      const updates = {
        N_Ssn: user.id,
        Fname: firstName,
        Lname: lastName,
      };

      let { error } = await supabase.from('NURSE').upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-[100%] w-[100%] items-start justify-start rounded-lg bg-auto-white p-2 ring-2 ring-black lg:h-[30%]">
      {loading ? (
        <InfinitySpin width="100" color="#475569" />
      ) : (
        <>
          <Avatar doctorId={doctorId} />
          <form
            className="flex flex-col items-start justify-start gap-2 divide-y-2 divide-gray-400 p-2"
            onSubmit={updateProfile}
          >
            <div className="flex items-center font-extrabold text-blue-500">
              <label htmlFor="password">Password</label>
              <input
                className="ml-2 rounded p-2 text-gray-500 ring-2 ring-gray-300 "
                type="password"
                id="password"
                value={'' || password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="rounded-lg py-2 px-4 font-normal text-black ring-2 ring-gray-300 hover:ring-black "
                disabled={loading}
                onClick={async () => {
                  const { data, error } = await supabase.auth.updateUser({
                    password: password,
                  });
                  if (error) throw error;
                }}
              >
                Reset
              </button>
            </div>

            <div className="flex gap-2 pt-2">
              <label htmlFor="firstName">First name</label>
              <input
                className="ml-2 w-[7rem] overflow-hidden rounded p-2 text-gray-500 ring-2 ring-gray-300"
                id="firstName"
                type="text"
                value={firstName || ''}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label htmlFor="lastName">Last name</label>
              <input
                className="ml-2 w-[7rem] overflow-hidden rounded p-2 text-gray-500 ring-2 ring-gray-300"
                id="lastName"
                type="text"
                value={lastName || ''}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </form>
        </>
      )}
      <div className="absolute bottom-0 right-4 flex gap-2 py-2">
        <button
          className="ml-2 w-[7rem] rounded-lg bg-blue-600 py-2 px-4 text-white hover:ring-2 hover:ring-black"
          disabled={loading}
        >
          Update
        </button>
        <button
          type="button"
          className="rounded-lg bg-red-600 py-2 px-4 text-white hover:ring-2 hover:ring-black"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default NurseProfile;
