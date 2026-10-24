import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router';
import './styles/global.css';
import './styles/portfolio.css';
import './styles/experience.css';
import './styles/gallery.css';
import './styles/navigation.css';
import './styles/header.css';
import './styles/projectDetails.css';
import './styles/backToTop.css';
import './styles/chat.css';
import './styles/pageStatus.css';
import ChatWidget from './components/ChatWidget';
import AppErrorBoundary from './components/AppErrorBoundary';
import NetworkStatus from './components/NetworkStatus';
import { initBotId } from 'botid/client/core';

if (import.meta.env.PROD) {
  initBotId({
    protect: [
      {
        path: '/api/zel',
        method: 'POST',
        advancedOptions: { checkLevel: 'basic' },
      },
    ],
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <BrowserRouter>
        <App />
        <NetworkStatus />
        <ChatWidget />
      </BrowserRouter>
    </AppErrorBoundary>
  </StrictMode>,
);
