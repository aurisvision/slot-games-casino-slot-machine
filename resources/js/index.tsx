import React from 'react';
import ReactDOM from 'react-dom';
import './assets/fonts/Bronzier-Medium.ttf';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Preloader from "./Preloader";
import responsiveModule from "./responsiveModule";
import Watermark from './Watermark';

ReactDOM.render(
  <React.StrictMode>
    <Watermark />
    <Preloader />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
//
responsiveModule();
//