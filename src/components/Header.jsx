import { useMediaQueries } from '@/shared/hooks/useMediaQueries';
import React from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const Header = () => {
  const { isMd } = useMediaQueries();
  const [shouldDropDownDisplay, setShouldDropDownDisplay] = React.useState(false);
  const [animationParentRef] = useAutoAnimate();
  return isMd ? (
    <nav className="mx-auto flex h-full w-11/12 flex-col items-center xs:flex-row ">
      <Link
        to="/"
        className="flex h-3/4 w-full items-center justify-center gap-4 border-b-2 border-pink-300 py-2 xs:mr-auto xs:w-[15rem] md:border-none"
      >
        <img
          src="assets/logos/logo_better.png"
          className="aspect-square w-[3rem] overflow-hidden rounded-full object-cover"
          alt="logo"
        />
        <span className="uppsercase text-[1.5rem] text-pink-500 md:normal-case">
          DengueApp
        </span>
      </Link>

      <Link
        to='/'
        className="transition-full grid h-3/4 w-full place-items-center py-4 text-lg duration-300 hover:font-bold  hover:tracking-wider xs:ml-auto xs:w-[8rem] "
      >
        About us
      </Link>
      <div className="flex h-[2rem] w-full items-center justify-start py-4 text-base text-sky-500 xs:w-auto md:ml-8 md:mr-2 md:h-3/4 md:justify-center">
        Sign in as
      </div>
      <Link
        to="/auth"
        className="transition-full grid h-1/2 w-full place-items-center rounded-lg bg-pink-200 py-4 text-lg leading-3  duration-100 hover:bg-rose-200 hover:text-white xs:w-[8rem] md:-mr-4"
      >
        Patient
      </Link>
      <Link
        to="/auth"
        className="transition-full grid h-1/2 w-full place-items-center rounded-lg bg-pink-300 py-4 text-lg leading-3 duration-100 hover:bg-rose-300 hover:text-white xs:w-[13rem]  md:ml-2"
      >
        Doctor / Nurse
      </Link>
    </nav>
  ) : (
    <div className="h-full w-full" ref={animationParentRef}>
      <nav className="mx-auto flex h-full w-11/12 items-center">
        <Link
          to="/"
          className="flex h-3/4 max-w-[15rem] items-center justify-center gap-4 border-b-2 border-pink-300 py-2 xs:mr-auto xs:w-[15rem] md:border-none"
        >
          <img
            src="assets/logos/logo_better.png"
            className="aspect-square w-[3rem] overflow-hidden rounded-full object-cover"
            alt="logo"
          />
          <span className="uppsercase text-[1.5rem] text-pink-500 md:normal-case">
            DengueApp
          </span>
        </Link>
        <button
          onClick={() => setShouldDropDownDisplay((prev) => !prev)}
          className={`ml-auto transition-all duration-200 ${
            shouldDropDownDisplay ? 'rotate-90' : ''
          }`}
        >
          <GiHamburgerMenu size="25" color="#ec4899" />
        </button>
      </nav>
      {shouldDropDownDisplay && (
        <div className="mx-auto flex w-11/12 flex-col items-center justify-center py-2">
          <Link
            to="/"
            className="transition-full grid h-3/4 w-full place-items-center py-4 text-lg duration-300 hover:font-bold  hover:tracking-wider xs:ml-auto xs:w-[8rem]"
          >
            About us
          </Link>
          <div className="flex h-[2rem] w-full items-center justify-start py-4 text-base text-sky-500 xs:w-auto md:ml-8 md:mr-2 md:h-3/4 md:justify-center">
            Sign in as
          </div>
          <Link
            to="/auth"
            className="transition-full grid h-1/2 w-full place-items-center rounded-lg bg-pink-200 py-4 text-lg leading-3  duration-100 hover:bg-rose-200 hover:text-white xs:w-[8rem] md:-mr-4"
          >
            Patient
          </Link>
          <Link
            to="/auth"
            className="transition-full grid h-1/2 w-full place-items-center rounded-lg bg-pink-300 py-4 text-lg leading-3 duration-100 hover:bg-rose-300 hover:text-white xs:w-[13rem]  md:ml-2"
          >
            Doctor / Nurse
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
