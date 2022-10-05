import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes';
import './index.css';
import GlobalProvider from './contexts/GlobalContextProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalProvider>
    <Routes />
  </GlobalProvider>
);
