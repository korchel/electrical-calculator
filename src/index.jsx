/* eslint-disable functional/no-expression-statements */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const app = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
};

app();
