import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import { dividerClasses } from '@mui/material';
import { useAtom } from 'jotai';
import { messageList } from '@/dashboard/doctor/App';
import { userSession } from '@/dashboard/Auth';

const MessageContainer = (props) => {
  const [messages] = useAtom(messageList);
  const [session] = useAtom(userSession);

  return (
    <div className="flex min-h-[100%] w-[95%] flex-col items-start justify-start gap-10 bg-gradient-to-b from-gray-800 to-gray-500 pb-8">
      {props.room &&
        messages
          .filter((message) => message.R_Number === props.room.R_Number)
          .map((message, index) => {
            return (
              <div
                key={index}
                className="relative flex w-[100%] items-center justify-start"
              >
                <div className="absolute -top-8 right-[35%] text-[10px] text-gray-200">
                  {new Date(message.created_at).toLocaleString()}
                </div>
                {message.Signature === session.user.id ? (
                  <>
                    <div className="absolute -top-6 right-4 text-[12px] tracking-wider text-gray-100">
                      {message.Username}
                    </div>
                    {message.Type === 'text' && (
                      <div className="ml-auto mr-4 max-w-[50%] rounded-2xl bg-auto-white bg-gradient-to-t from-white to-gray-200 px-4 py-2 shadow-lg">
                        {message.Content}
                      </div>
                    )}
                    {message.Type === 'image' && (
                      <div className="ml-auto mr-4 rounded-sm bg-white shadow-lg ring-2 ring-black">
                        <img
                          src={
                            message.Content
                              ? message.Content
                              : `https://place-hold.it/150x150`
                          }
                          alt={message.Content ? 'Image' : 'No image'}
                          style={{ height: 150, width: 150 }}
                        />
                      </div>
                    )}
                    <div className="absolute -right-4 h-[4px] w-[4px] rounded-full bg-black"></div>
                  </>
                ) : (
                  <>
                    <div className="absolute -top-6 left-0 text-[12px] tracking-wider text-white">
                      {message.Username}
                    </div>
                    <div className="h-[2rem]  w-[2rem] rounded-full bg-gray-300">Ava</div>
                    <div
                      className="ml-4 max-w-[50%] rounded-2xl bg-auto-white bg-gradient-to-t from-white to-gray-200 px-4 py-2 shadow-lg"
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
