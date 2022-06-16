import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import Credits from './componentes/credits';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Credits value='Harlon Garcia' />
  </React.StrictMode>
);