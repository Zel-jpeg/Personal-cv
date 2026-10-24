import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router';
import './styles/global.css';
import './styles/portfolio.css';
import './styles/gallery.css';
import './styles/navigation.css';
import './styles/header.css';
import './styles/projectDetails.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
