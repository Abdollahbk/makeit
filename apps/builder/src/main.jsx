import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.css'

// Add Google Fonts - Extended collection of popular free fonts
const fonts = [
  'Inter:wght@300;400;500;600;700',
  'Roboto:wght@300;400;500;700',
  'Lato:wght@300;400;700',
  'Merriweather:wght@300;400;700',
  'Montserrat:wght@300;400;500;600;700',
  'Open+Sans:wght@300;400;500;600;700',
  'Poppins:wght@300;400;500;600;700',
  'Source+Sans+Pro:wght@300;400;600;700',
  'Nunito:wght@300;400;500;600;700',
  'Ubuntu:wght@300;400;500;700',
  'Raleway:wght@300;400;500;600;700',
  'PT+Sans:wght@400;700',
  'Noto+Sans:wght@300;400;500;700',
  'Work+Sans:wght@300;400;500;600;700',
  'Mulish:wght@300;400;500;600;700',
  'IBM+Plex+Sans:wght@300;400;500;600;700',
  'Fira+Sans:wght@300;400;500;600;700',
  'Quicksand:wght@300;400;500;600;700',
  'Josefin+Sans:wght@300;400;500;600;700',
  'Barlow:wght@300;400;500;600;700',
  'Archivo:wght@300;400;500;600;700',
  'Manrope:wght@300;400;500;600;700',
  'DM+Sans:wght@300;400;500;600;700',
  'Karla:wght@300;400;500;600;700',
  'Rubik:wght@300;400;500;600;700',
  'Cabin:wght@300;400;500;600;700',
  'Libre+Franklin:wght@300;400;500;600;700',
  'Maven+Pro:wght@300;400;500;600;700',
  'Comfortaa:wght@300;400;500;600;700',
  'Exo+2:wght@300;400;500;600;700',
  'Prompt:wght@300;400;500;600;700',
  'Sora:wght@300;400;500;600;700',
  'Plus+Jakarta+Sans:wght@300;400;500;600;700',
  'Albert+Sans:wght@300;400;500;600;700',
  'Outfit:wght@300;400;500;600;700',
  'Geist:wght@300;400;500;600;700',
  'Inter+Tight:wght@300;400;500;600;700'
];

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = `https://fonts.googleapis.com/css2?${fonts.join('&family=')}&display=swap`;
document.head.appendChild(link);

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
