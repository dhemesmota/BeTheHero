import React from 'react';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';

import 'react-toastify/dist/ReactToastify.css';
import './global.css';

function App() {
  return (
    <>
      <ToastContainer autoClose={5000} />
      <Routes />
    </>
  );
}

export default App;
