import React from 'react';

const Header = () => {
  return (
    <nav className="xs:flex-row mx-auto flex h-full w-full flex-col items-center opacity-100 shadow-lg ">
      <a href="" className="xs:w-[15rem] xs:mr-auto grid h-3/4 w-full place-items-center">
        Nguyen Hoang Long
      </a>
      <a href="" className="xs:w-[10rem] xs:ml-auto grid h-3/4 w-full place-items-center">
        About me
      </a>
      <a href="" className="xs:w-[10rem] grid h-3/4 w-full place-items-center">
        Skills
      </a>
      <a href="" className="xs:w-[10rem] grid h-3/4 w-full place-items-center">
        Projects
      </a>
      <a href="" className="xs:w-[10rem] grid h-3/4 w-full place-items-center">
        Contacts
      </a>
    </nav>
  );
};

export default Header;
