import React from 'react';
import ReactDOM from 'react-dom';
import '@/index.css';
import App from './App';
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
    <div>
      <Routes>
        <Route path="/pages/dashboard/doctor/index.html" element={<Login />} />
        <Route path="/pages/dashboard/doctor/home" element={<App />} />
      </Routes>
    </div>
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById('doctor'),
);
