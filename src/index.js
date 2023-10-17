import React from 'react';
import { createRoot } from "react-dom/client";
import './styles/main.scss';
import Home from './pages/Home';
import { DappProvider } from '@multiversx/sdk-dapp/wrappers/DappProvider';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './const'
import Profile from 'pages/Profile';
import Footer from 'components/Footer';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DappProvider environment="mainnet">
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.profile} element={<Profile />} />

          <Route path='*' element={<Home />} />
        </Routes>
        <Footer />
      </DappProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
