import { BrowserRouter } from 'react-router-dom';
import { createRoot } from "react-dom/client";
import App from './App';
import React from 'react';
import './index.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);