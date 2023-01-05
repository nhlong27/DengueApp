import React, { useState, useEffect } from 'react';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { dividerClasses } from '@mui/material';
import {useAtom} from 'jotai';
import { messageList } from '@/dashboard/doctor/App';
import { userSession } from '@/dashboard/Auth';

const MessageContainer = (props) => {
  const [messages] = useAtom(messageList);
  const [session] = useAtom(userSession)


  return (
    <div className="flex flex-col items-start justify-start gap-10 px-4 py-8">
      {props.room && messages
        .filter((message) => message.R_Number === props.room.R_Number)
        .map((message, index) => {
          return (
            <div className="relative flex w-[100%] items-center justify-start">
              <div className="absolute -top-8 right-[35%] text-[10px]">
                {new Date(message.created_at).toLocaleString()}
              </div>
              {message.Signature === session.user.id ? (
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
                    className="ml-4 max-w-[50%] rounded-2xl bg-auto-white px-4 py-2 shadow-lg"
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
