import React, { useState } from 'react';
import Chatbox from './components/Chatbox';
import Content from './components/ContentContainer';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {

  return (
    <div className="flex h-screen w-screen flex-auto">
      <Sidebar />
      <div className=" flex flex-grow flex-col bg-auto-white">
        <Navbar />
        <main className="flex w-[100%] h-[90%] flex-auto">
          <Content />
          <Chatbox />
        </main>
      </div>
    </div>
  );
}

export default App;
