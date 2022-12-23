import React, { useState, useEffect } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { supabase } from '@/shared/api/supabase/supabaseClient';

export default function Avatar({ url, size, onUpload, session }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage
        .from(`doctors/${session.user.id}/avatars/self`)
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
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from(`doctors/${session.user.id}/avatars/self`)
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="mb-4 flex items-end justify-start">
      <img
        className="ring-2 ring-black"
        src={avatarUrl ? avatarUrl : `https://place-hold.it/${size}x${size}`}
        alt={avatarUrl ? 'Avatar' : 'No image'}
        style={{ height: size, width: size }}
      />
      {uploading ? (
        <InfinitySpin width="100" color="#475569" />
      ) : (
        <div className="ml-8">
          <label className="text-blue-600" htmlFor="single">
            Upload an avatar
          </label>
          <div>
            <input
              type="file"
              id="single"
              accept="image/*"
              onChange={uploadAvatar}
              disabled={uploading}
            />
          </div>
        </div>
      )}
    </div>
  );
}
