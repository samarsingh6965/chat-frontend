import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import DataProvider from './Context/DataProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DataProvider>
      <BrowserRouter>
        <ToastContainer position="top-center" autoClose={2000} limit={2} hideProgressBar={false} newestOnTop={true} closeOnClick transition={Zoom} theme="light" />
        <App />
      </BrowserRouter>
    </DataProvider>
  </React.StrictMode>
);
reportWebVitals();
