import React from 'react';
import background_mobile from '/assets/backgrounds/background_mobile.png';
import background_desktop from '/assets/backgrounds/background_desktop.png';
import Header from './components/Header';
import Footer from './components/Footer';
import { useMediaQueries } from './shared/hooks/useMediaQueries';
import { Outlet } from 'react-router';

const App = () => {
  const { isXs } = useMediaQueries();
  return (
    <div className="z-0 min-h-dynamic-screen w-screen  bg-gradient-to-t  from-transparent via-pink-400 to-pink-50">
      <div className="relative z-0 mx-auto flex min-h-dynamic-screen w-full min-w-[300px] max-w-[1920px] flex-col items-center justify-start">
        <div className="transition-full sticky top-0 z-30 h-auto w-full bg-pink-50 opacity-100 shadow-lg duration-500 hover:opacity-100 xs:h-[4rem] lg:h-[5rem]">
          <Header />
        </div>
        <div className="relative z-10 min-h-screen w-11/12 grow">
          {!isXs && (
            <img
              src={background_mobile}
              className={`absolute top-0 z-0 mx-auto h-[15rem] w-full overflow-hidden object-cover opacity-90 brightness-50 `}
              alt="logo"
            />
          )}
          <div className="">
            <Outlet />
          </div>
        </div>
        {isXs && (
          <img
            src={background_desktop}
            className={`absolute top-0 z-0 mx-auto h-[50rem] w-full overflow-hidden object-cover opacity-90 brightness-50`}
            alt="logo"
          />
        )}
        <Footer />
      </div>
    </div>
  );
};

export default App;
