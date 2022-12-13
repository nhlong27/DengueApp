import { useState, useEffect } from 'react';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { InfinitySpin } from 'react-loader-spinner';
// import Avatar from './Avatar';

const Account = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
      setLoading(true);
      const { user } = session;

      let { data, error, status } = await supabase
        .from('DOCTOR')
        .select(`Username, Avatar_url, Fname, Lname`)
        .eq('D_Ssn', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.Username);
        setLastName(data.Lname);
        setFirstName(data.Fname);
        setAvatarUrl(data.Avatar_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { user } = session;

      const updates = {
        D_Ssn: user.id,
        Username: username,
        Fname: firstName,
        Lname: lastName,
        Avatar_url: avatar_url,
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
    <div className="m-8 min-h-[92%] rounded-lg bg-gray-300 px-8 py-16">
      <div className="flex w-auto flex-col items-start justify-start rounded-lg bg-auto-white p-8 shadow-lg ring-2 ring-black">
        {loading ? (
          <InfinitySpin width="100" color="#475569" />
        ) : (
          <>
            {/* <Avatar
            url={avatar_url}
            size={150}
            onUpload={(url) => {
              setAvatarUrl(url);
              updateProfile({ username, avatar_url: url });
            }}
          /> */}
            <form
              className="w-[100%] divide-y-2 divide-gray-400"
              onSubmit={updateProfile}
            >
              <div className="p-4 font-extrabold text-blue-500">
                Email: {session.user.email}
              </div>
              <div className="p-4">
                <label htmlFor="username">Username</label>
                <input
                  className="ml-4 rounded p-2 text-gray-500 ring-2 ring-gray-300 "
                  id="username"
                  type="text"
                  value={username || `Set a username`}
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
