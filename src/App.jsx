import React from 'react';
import background_mobile from "/assets/backgrounds/background_mobile.png";
import background_desktop from "/assets/backgrounds/background_desktop.png";
import Header from './components/Header';
import Footer from './components/Footer';
import { useMediaQueries } from './shared/hooks/useMediaQueries';

const App = () => {
  const { isXs } = useMediaQueries();
  return (
    <div className="min-h-dynamic-screen z-0 w-screen bg-gradient-to-t from-transparent  via-pink-100 to-pink-100">
      <div className="min-h-dynamic-screen relative z-0 mx-auto flex w-11/12 min-w-[300px] max-w-[1920px] flex-col items-center justify-start">
        <div className="xs:h-[4rem] transition-full sticky top-0 z-30 h-auto w-full bg-green-100 opacity-70 duration-500 hover:opacity-100 lg:h-[5rem]">
          <Header />
        </div>
        <div className="relative z-10 min-h-screen w-full grow">
          {!isXs && (
            <img
              src={background_mobile}
              className={`absolute top-0 z-0 mx-auto w-full`}
              alt="logo"
            />
          )}
          <div className="h-screen">dfd</div>
        </div>
        {isXs && (
          <img
            src={background_desktop}
            className={`absolute top-0 z-0 mx-auto w-full`}
            alt="logo"
          />
        )}
        <Footer />
      </div>
    </div>
  );
};

export default App;
