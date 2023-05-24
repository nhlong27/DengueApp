import Contacts from '@/components/Contacts';
import Features from '@/components/Features';
import React from 'react';

const HomePage = () => {
  return (
    <div className="w-full">
      <div className="flex justify-end items-center mt-[15rem] h-auto w-full md:mt-0 md:h-[45rem]">
        <span className='text-pink-50 leading-[4rem] text-[3rem] whitespace-normal ml-auto mr-16'>Our solution <br/> <span className='text-[2rem]'>for</span>  <span className='text-pink-400'>Dengue</span> outbreaks</span>
      </div>
      <Features />
      <Contacts />
    </div>
  );
};

export default HomePage;
