import React from 'react';
import ReactDOM from 'react-dom';
import '@/index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
    <div>
      <Routes>
        <Route path="/pages/dashboard/doctor/index.html" element={<App />} />
      </Routes>
    </div>
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById('doctor'),
);
