import React from 'react';

const SearchBar = () => {
  return (
    <div className="flex items-center">
      <div className="flex rounded border border-light-important">
        <input
          type="text"
          className="block w-full rounded-l-md border bg-white px-4 py-2 text-auto-black focus:border-cyan-400 focus:outline-none focus:ring focus:ring-light-important focus:ring-opacity-10"
          placeholder="Search..."
        />
        <button className="rounded-r border-l bg-light-important px-4 text-auto-white ">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
