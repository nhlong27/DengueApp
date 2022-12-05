import React from 'react'

const Chatbox = () => {
  return (
    <div className=" flex w-[25%] flex-col items-center justify-start overflow-y-scroll bg-auto-white shadow-lg">
      <div className="m-4 h-[40%] w-[80%] rounded-[3rem] bg-black p-8 ">
        <div className="text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, ad.
        </div>
      </div>
      <div className="m-4 h-[40%] w-[80%] p-8">
        <div className="text-black">Lorem ipsum dolor sit amet.</div>
        <div className="text-black">Lorem ipsum dolor sit amet.</div>
        <div className="text-black">Lorem ipsum dolor sit amet.</div>
      </div>
      <div className="m-4 h-[20%] w-[80%] p-8 rounded-[2rem]  bg-black text-white">Lorem ipsum dolor sit amet.</div>
    </div>
  );
}

export default Chatbox