import React from 'react';

const Footer = () => {
  return (
    <div className="grid min-h-[20rem] w-full place-items-center">
      <div className="grid h-full w-full min-w-[300px] max-w-[1920px] place-items-center md:w-11/12">
        <div className="xs:grid-rows-1 xs:grid-cols-3 grid h-3/4 w-full min-w-[300px] max-w-[1920px] grid-cols-1 grid-rows-3 place-items-center md:w-11/12">
          <div>a</div>
          <div>b</div>
          <div>c</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
