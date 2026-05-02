import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/global.css';

// Add Google Fonts - Consistent with make-it app
const fonts = [
  'Inter:wght@300;400;500;600;700',
  'Outfit:wght@300;400;500;600;700;800'
];

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = `https://fonts.googleapis.com/css2?${fonts.join('&family=')}&display=swap`;
document.head.appendChild(link);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
