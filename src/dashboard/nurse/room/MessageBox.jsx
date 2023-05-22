import React, { useEffect, useState, useRef } from 'react';
import ChatContainer from './ChatContainer';
import { userSession } from '@/dashboard/Auth';
import { supabase } from '@/shared/api/supabase/supabaseClient';
import EmojiPicker from 'emoji-picker-react';
import { FaImages } from 'react-icons/fa';
import { BsFillEmojiWinkFill } from 'react-icons/bs';
import { useAtom } from 'jotai';
import { RiSendPlane2Line } from 'react-icons/ri';

const MessageBox = (props) => {
  const [newMessage, setNewMessage] = useState('');
  const [session] = useAtom(userSession);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [isEmoji, setEmoji] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLoadMessage = async () => {
    try {
      const { data: MESSAGE, error } = await supabase
        .from('MESSAGE')
        .select('*')
        .eq('R_Number', props.R_Number);
      setMessages(() => MESSAGE);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = async () => {
    const { data: USER } = await supabase
      .from('NURSE')
      .select('*')
      .eq('N_Ssn', session.user.id)
      .single();
    if (!newMessage) {
      alert('Invalid message!');
    }
    const { error } = await supabase.from('MESSAGE').insert([
      {
        Username: USER.Lname,
        Content: newMessage,
        R_Number: props.R_Number,
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
          handleLoadMessage();
        },
      )
      .subscribe();
  };

  useEffect(() => {
    handleLoadMessage();
    listenMessageUpdate();
    scrollToBottom();
  }, []);

  return (
    <div className="w-[100%] basis-[85%]">
      <div className="flex h-[100%] w-[100%] flex-col items-center rounded-lg bg-gray-300">
        <div className="scrollbar mt-2 h-[75%] w-[100%] overflow-y-scroll bg-gray-400">
          <ChatContainer messages={messages} />
          <div ref={messagesEndRef}></div>
        </div>
        <div className=" flex h-[20%] w-[100%] items-center justify-end bg-gray-300 p-3 shadow-sm">
          <div className="mr-4 rounded-full py-2 pl-2 pr-2 hover:bg-gray-200">
            <label htmlFor="file">
              <FaImages size={25} />
            </label>
            {/* <input
              type="file"
              id="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={uploadImage}
            /> */}
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
  );
};

export default MessageBox;
