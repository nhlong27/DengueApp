import React from 'react';
import ReactDOM from 'react-dom';
import '@/index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './Auth';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('dashboard');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/dashboard/*" element={<Auth />} />
    </Routes>
  </BrowserRouter>,
);
