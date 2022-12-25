import React, { useState, useEffect } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { useAtom } from 'jotai';
import { userSession } from '@/dashboard/Auth';

const NurseAvatar = ({ isNurse }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [update, setUpdate] = useState(false);

  const [session] = useAtom(userSession);

  useEffect(() => {
    downloadImage('avatar.png');
  }, [update]);

  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage
        .from(`doctors/${session.user.id}/nurses/${isNurse.N_Ssn}`)
        .download(path);
      if (error) {
        throw error;
      }
      if (data) {
        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      }
    } catch (error) {
      console.log('Error downloading image: ', error.message);
    }
  };

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      // const fileExt = file.name.split('.').pop();
      // const fileName = `avatar.${fileExt}`;
      // const filePath = `${fileName}`;
      if (avatarUrl) {
        const { data, error: updateError } = await supabase.storage
          .from(`doctors/${session.user.id}/nurses/${isNurse.N_Ssn}`)
          .update(`avatar.png`, file, {
            cacheControl: '3600',
            upsert: false,
          });
        if (updateError) {
          throw updateError;
        }
      } else {
        let { error: uploadError } = await supabase.storage
          .from(`doctors/${session.user.id}/nurses/${isNurse.N_Ssn}`)
          .upload(`avatar.png`, file);
        if (uploadError) {
          throw uploadError;
        }
      }
      setUpdate((state) => !state);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };
  return (
    <>
      {uploading ? (
        <InfinitySpin width="100" color="#475569" />
      ) : (
        <div className="flex flex-col items-center justify-start text-[14px] absolute top-0 w-[45%] left-0">
          {/* <label className="text-blue-600" htmlFor="single">
            Upload an avatar
          </label> */}
          <input
            className="bg-auto-white ring-2 ring-gray-300 hover:ring-black overflow-hidden w-[100%] rounded-xl h-[1.5rem]"
            type="file"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </div>
      )}
      <img
        className={`row-span-3 mt-4 h-[10rem] w-[80%] rounded-full bg-gray-400 ring-4 ring-offset-2 `}
        src={avatarUrl ? avatarUrl : `https://place-hold.it/150x150`}
        alt={avatarUrl ? 'Avatar' : 'No image'}
        style={{ height: 150, width: 150 }}
      />
    </>
  );
};

export default NurseAvatar;
