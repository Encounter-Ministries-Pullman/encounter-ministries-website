import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { ENCOUNTER_COLORS } from './constants.tsx';
import './styles.css';

for (const [name, color] of Object.entries(ENCOUNTER_COLORS)) {
  document.documentElement.style.setProperty(`--color-${name}`, color);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);