import CallToAction from '@/components/CallToAction';
import Contacts from '@/components/Contacts';
import Features from '@/components/Features';
import React from 'react';

const HomePage = () => {
  return (
    <div id='about_us' className="w-full h-auto">
      <div className="relative mt-[15rem] flex h-auto w-full items-center justify-end md:mt-0 md:h-[45rem]">
        <span className="absolute top-0 left-0 ml-0 whitespace-normal text-base leading-[4rem] text-pink-50">
          <div class="max-w-4xl rounded-lg bg-transparent p-4">
            <div class="mb-2 collapse md:visible">
              <div class="h-3 text-left text-3xl ">“</div>
              <p class="px-4 text-center tracking-[0.3rem] italic">
                Using the advancements of IoT
              </p>
              <div class="h-3 text-right text-3xl ">”</div>
            </div>
          </div>
        </span>
        <span className="ml-auto mr-16 whitespace-normal text-[2rem] md:text-[3rem] leading-[4rem] text-stone-900  md:text-pink-50">
          The solution <br /> <span className="text-[2rem]">for</span>{' '}
          <span className="text-pink-400">Dengue</span> outbreaks
        </span>
      </div>
      <Features />
      <CallToAction />
      <Contacts />
    </div>
  );
};

export default HomePage;
