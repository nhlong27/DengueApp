import React, { useState, useEffect, useRef } from 'react';
import SearchBar from '../../components/SearchBar';
import { facilityList } from '@/dashboard/doctor/App';
import { useAtom } from 'jotai';
import { RiSendPlane2Line } from 'react-icons/ri';
import MessageContainer from './MessageContainer';
import { userSession } from '@/dashboard/Auth';
import { messageList } from '@/dashboard/doctor/App';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import EmojiPicker from 'emoji-picker-react';
import { FaImages } from 'react-icons/fa';
import { BsFillEmojiWinkFill } from 'react-icons/bs';

const Messages = (props) => {
  const [room, setRoom] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages] = useAtom(messageList);
  const [facilities] = useAtom(facilityList);
  const [session] = useAtom(userSession);
  const messagesEndRef = useRef(null);
  const [isEmoji, setEmoji] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    const { data: USER } = await supabase
      .from('DOCTOR')
      .select('*')
      .eq('D_Ssn', session.user.id)
      .single();
    if (!newMessage) {
      alert('Invalid message!');
    }
    if (!room) {
      alert('You must pick a chat room!');
    }
    const { error } = await supabase.from('MESSAGE').insert([
      {
        Username: USER.Username,
        Content: newMessage,
        R_Number: room.R_Number,
        Signature: session.user.id,
        Type: 'text',
      },
    ]);
    if (error) throw error;
    setNewMessage(() => '');
  };

  const listenMessageUpdate = () => {
    const MESSAGE = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'MESSAGE' },
        (payload) => {
          console.log('Change received!', payload);
          props.handleLoadMessage();
        },
      )
      .subscribe();
  };

  const uploadImage = async () => {
    try {
      if (!room) {
        alert('You must pick a chat room!');
      }
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from(`doctors/${session.user.id}/messages`)
        .upload(filePath, file);
      if (uploadError) {
        throw uploadError;
      }

      const { data: USER } = await supabase
        .from('DOCTOR')
        .select('*')
        .eq('D_Ssn', session.user.id)
        .single();

      const { error } = await supabase.from('MESSAGE').insert([
        {
          Username: USER.Username,
          Content: filePath,
          R_Number: room.R_Number,
          Signature: session.user.id,
          Type: 'image',
        },
      ]);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    listenMessageUpdate();
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [room]);

  return (
    <>
      <div className="flex items-center justify-start border-b-2 border-gray-900 p-2 shadow-sm">
        <div className="ml-auto flex h-[80%] w-[50%] items-center justify-center rounded-[3rem] bg-black p-2 shadow-lg">
          <SearchBar />
        </div>
      </div>
      <div className="relative flex h-[100%] overflow-hidden bg-gray-300">
        <div className="h-[100%] w-[40%] py-2 pr-2 pl-4 shadow-lg">
          <div className="flex h-[100%] w-[100%] flex-col justify-between rounded-2xl bg-auto-white p-4 shadow-lg ring-2 ring-black">
            <div className="flex h-[100%] w-[100%] flex-col items-center justify-between rounded-2xl p-4 shadow-xl ring-2 ring-gray-200">
              <div className="scrollbar z-10 flex h-[30%] w-[100%] flex-wrap items-start justify-start gap-4 overflow-y-scroll rounded-lg border-l-2 border-b-2 border-black p-4 shadow-xl">
                {facilities ? (
                  Object.values(facilities).map((room, index) => {
                    return (
                      <div
                        onClick={() => setRoom(room)}
                        key={index}
                        className="text-extrabold rounded-lg px-4 py-2 text-center shadow-lg ring-2 ring-gray-300 hover:ring-black focus:ring-black"
                      >
                        <span className="text-blue-600">Room </span> {room.R_Number}
                      </div>
                    );
                  })
                ) : (
                  <div>No room currently</div>
                )}
              </div>
              <div className="scrollbar z-0 flex h-[70%] w-[100%] flex-col gap-2 overflow-x-hidden overflow-y-scroll rounded-b-2xl border-l-2 border-black bg-gradient-to-t from-gray-200 to-auto-white pt-4">
                {room ? (
                  room.nurses.map((nurse, index) => {
                    return (
                      <div
                        key={index}
                        className="transition-all duration-300 hover:border-r-4 hover:border-black"
                      >
                        <div className="ml-2 max-w-[15rem] rounded-lg px-4 py-2 shadow-lg ring-2 ring-gray-300 transition-all duration-300 hover:ml-8 hover:ring-black">
                          <span>{nurse.Fname} </span>
                          {nurse.Lname}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="transition-all duration-300 hover:border-r-4 hover:border-black">
                    <div className="ml-2 max-w-[15rem] rounded-lg px-4 py-2 shadow-lg ring-2 ring-gray-300 transition-all duration-300 hover:ml-8 hover:ring-black">
                      Pick a room
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-[100%] w-[60%] flex-col items-center rounded-sm bg-gray-300">
          <div className="scrollbar mt-2 h-[85%] w-[100%] overflow-y-scroll bg-gray-400">
            <MessageContainer room={room} />
            <div ref={messagesEndRef}></div>
          </div>
          <div className=" flex h-[15%] w-[100%] items-center justify-end bg-gray-300 p-3 shadow-sm">
            <div className="mr-4 rounded-full py-2 pl-2 pr-2 hover:bg-gray-200">
              <label htmlFor="file">
                <FaImages size={25} />
              </label>
              <input
                type="file"
                id="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={uploadImage}
              />
            </div>
            <div
              className="relative mr-4 rounded-full py-2 pl-2 pr-2 hover:bg-gray-200"
              onClick={() => setEmoji((state) => !state)}
            >
              <BsFillEmojiWinkFill size={25} />
              {isEmoji && (
                <div className="absolute -top-[25rem] right-0">
                  <EmojiPicker
                    onEmojiClick={(emoji) =>
                      setNewMessage((message) => message.concat(emoji.emoji))
                    }
                  />
                </div>
              )}
            </div>
            <div className="h-[70%] w-[70%] rounded-3xl bg-auto-white hover:ring-2 hover:ring-gray-600">
              <input
                type="text"
                className="h-[100%] w-[100%] rounded-3xl  bg-auto-white px-4 text-[18px] text-black"
                placeholder="Aa..."
                onChange={(e) => setNewMessage(() => e.target.value)}
                value={newMessage}
              />
            </div>
            <button
              onClick={() => handleSendMessage()}
              className="ml-2 rounded-full py-2 pl-3 pr-2 hover:bg-gray-200"
            >
              <RiSendPlane2Line color="black" size={30} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
