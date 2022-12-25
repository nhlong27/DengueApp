import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({value, setValue}) => {

  const handleChange = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setValue(e.target.value);
    }, 1000);
  };
  return (
    <div className="flex w-[100%] items-center overflow-hidden rounded-[3rem] hover:bg-gray-800">
      <div className="flex items-center justify-between">
        <input
          type="text"
          className="block rounded-l-md bg-black px-4 py-2 text-[18px] text-white"
          placeholder="Search..."
          onChange={(e) => handleChange(e)}
        />
        <button className=" ml-auto px-4">
          <FiSearch color="white" size={20} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
