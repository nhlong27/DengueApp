import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="xs:flex-row mx-auto flex h-full w-11/12 flex-col items-center">
      <Link to="/" className="xs:w-[15rem] xs:mr-auto h-3/4 w-full flex gap-4 justify-center py-2 border-b-2 border-pink-300 md:border-none items-center">
        <img src="assets/logos/logo_better.png" className='md:w-[7rem] w-[3rem] overflow-hidden rounded-full aspect-square object-cover' alt="logo" />
        <span className='text-[2rem] text-pink-500 md:normal-case uppsercase'>DengueApp</span>
      </Link>
      <Link to="/" className="py-4 xs:w-[10rem] xs:ml-auto grid h-3/4 w-full place-items-center">
        About us
      </Link>
      <div className="py-4 xs:w-[10rem] grid h-3/4 w-full place-items-center">
        Sign in
      </div>
      <Link to="/auth" className="py-4 xs:w-[10rem] grid h-3/4 w-full place-items-center">
        As patient
      </Link>
      <Link to="/auth" className="py-4 xs:w-[10rem] grid h-3/4 w-full place-items-center">
        As doctor or nurse
      </Link>
    </nav>
  );
};

export default Header;
