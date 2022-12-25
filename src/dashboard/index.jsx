import React from 'react';
import ReactDOM from 'react-dom';
import '@/index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './Auth';

ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
      <Routes>
        <Route path="/dashboard/*" element={<Auth />} />
      </Routes>
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById('dashboard'),
);
