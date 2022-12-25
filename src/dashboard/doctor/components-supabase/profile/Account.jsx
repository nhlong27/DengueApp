import { useState, useEffect } from 'react';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { InfinitySpin } from 'react-loader-spinner';
import Avatar from './Avatar';

const Account = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('Reset password');
  const [email, setEmail] = useState(session.user.email);
  const [username, setUsername] = useState(null);
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
        .from('DOCTOR')
        .select(`Username, Fname, Lname`)
        .eq('D_Ssn', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.Username);
        setLastName(data.Lname);
        setFirstName(data.Fname);
        // setAvatarUrl(data.Avatar_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  // const updateAvatar = async (url) => {
  //    try {
  //      setLoading(true);

  //      let { error } = await supabase.from('DOCTOR').update({Avatar_url: url}).eq('D_Ssn', session.user.id);

  //      if (error) {
  //        throw error;
  //      }
  //    } catch (error) {
  //      alert(error.message);
  //    } finally {
  //      setLoading(false);
  //    }
  // }
  const updateProfile = async () => {
    try {
      setLoading(true);
      const { user } = session;

      const updates = {
        D_Ssn: user.id,
        Username: username,
        Fname: firstName,
        Lname: lastName,
        // Avatar_url: avatar_url,
        Updated_at: new Date(),
      };

      let { error } = await supabase.from('DOCTOR').upsert(updates);

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
    <div className="m-8 min-h-[92%] rounded-lg bg-gray-300 px-4 py-4">
      <div className="flex w-auto flex-col items-start justify-start rounded-lg bg-auto-white px-8 pt-8 shadow-lg ring-2 ring-black">
        {loading ? (
          <InfinitySpin width="100" color="#475569" />
        ) : (
          <>
            <Avatar
              // url={avatar_url}
              size={150}
              // onUpload={async (url) => {
              //   await setAvatarUrl(() => url);
              // await updateAvatar(url);

              // }}
              session={session}
            />
            <form
              className="w-[100%] divide-y-2 divide-gray-400"
              onSubmit={updateProfile}
            >
              <div className="relative flex items-center p-4 font-extrabold text-blue-500">
                <label htmlFor="email">Email:</label>
                <input
                  className="ml-12 rounded p-2 text-gray-500 ring-2 ring-gray-300 "
                  id="email"
                  type="text"
                  value={'' || email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className=" ml-4 rounded-lg py-2 px-4 font-normal text-black ring-2 ring-gray-300 hover:ring-black "
                  disabled={loading}
                  onClick={async () => {
                    const { data, error } = await supabase.auth.updateUser({
                      email: email,
                    });
                    if (error) throw error;
                  }}
                >
                  Reset
                </button>
                <label
                  className="absolute right-0 -top-4 font-normal text-black"
                  htmlFor="password"
                >
                  Password should be at least 6 character long
                </label>
                <input
                  className="ml-auto rounded p-2 text-gray-500 ring-2 ring-gray-300 "
                  type="password"
                  id="password"
                  value={'' || password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="ml-4 rounded-lg py-2 px-4 font-normal text-black ring-2 ring-gray-300 hover:ring-black "
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
              <div className="p-4">
                <label htmlFor="username">Username</label>
                <input
                  className="ml-4 rounded p-2 text-gray-500 ring-2 ring-gray-300 "
                  id="username"
                  type="text"
                  value={username || ''}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="p-4">
                <label htmlFor="firstName">First name</label>
                <input
                  className="ml-4 rounded p-2 text-gray-500 ring-2 ring-gray-300"
                  id="firstName"
                  type="text"
                  value={firstName || ''}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="p-4">
                <label htmlFor="lastName">Last name</label>
                <input
                  className="ml-4 rounded p-2 text-gray-500 ring-2 ring-gray-300"
                  id="lastName"
                  type="text"
                  value={lastName || ''}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="p-4">
                <button
                  className="ml-4 rounded-lg bg-blue-600 py-2 px-4 text-white hover:ring-2 hover:ring-black"
                  disabled={loading}
                >
                  Update profile
                </button>
              </div>
            </form>
          </>
        )}
        <div className="relative w-[100%] py-2">
          <button
            type="button"
            className="absolute bottom-[2rem] right-8 rounded-lg bg-red-600 py-2 px-4 text-white hover:ring-2 hover:ring-black"
            onClick={() => supabase.auth.signOut()}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
