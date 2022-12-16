import React, { useState, useEffect } from 'react';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { dividerClasses } from '@mui/material';

const MessageContainer = (props) => {
  const [messages, loadMessages] = useState([]);
  const [username, setUsername] = useState(null);
  const handleLoad = async () => {
    const { data: MESSAGE, error } = await supabase
      .from('MESSAGE')
      .select('*')
      .eq('R_Number', props.room.R_Number);
    loadMessages(() => MESSAGE);
  };

  const listenUpdate = () => {
    const MESSAGE = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'MESSAGE' },
        (payload) => {
          console.log('Change received!', payload);
          if (payload.new.R_Number === props.room.R_Number) {
            loadMessages((prev) => [...prev, payload.new]);
          }
        },
      )
      .subscribe();
  };

  useEffect(async () => {
    await handleLoad();
    listenUpdate();
  }, [props.room]);

  useEffect(async () => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const { data } = await supabase
        .from('DOCTOR')
        .select('*')
        .eq('D_Ssn', session.user.id)
        .single();
      setUsername(data.Username);
    });
  }, []);

  return (
    <div className="flex flex-col items-start justify-start gap-10 px-4 py-8">
      {messages.map((message, index) => {
        return (
          <div className="relative flex w-[100%] items-center justify-start">
            <div className="absolute -top-8 right-[35%] text-[10px]">
              {new Date(message.created_at).toLocaleString()}
            </div>
            {message.Username === username ? (
              <>
                <div className="absolute -top-6 right-4 text-[12px] tracking-wider text-white">
                  {message.Username}
                </div>
                <div
                  className="ml-auto mr-4 max-w-[50%] rounded-2xl bg-auto-white px-4 py-2 shadow-lg"
                  key={index}
                >
                  {message.Content}
                </div>
              </>
            ) : (
              <>
                <div className="absolute -top-6 left-0 text-[12px] tracking-wider text-white">
                  {message.Username}
                </div>
                <div className="h-[2rem]  w-[2rem] rounded-full bg-gray-300">Ava</div>
                <div
                  className="ml-4 rounded-2xl max-w-[50%] bg-auto-white px-4 py-2 shadow-lg"
                  key={index}
                >
                  {message.Content}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MessageContainer;
