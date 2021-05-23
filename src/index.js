import React from "react";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// menu open/close function
let menuOpener = () => {
  const button = document.querySelector('.header__burger');
  const menu = document.querySelector('.header__menu');
  const page = document.querySelector('body');

  const classNames = {
    buttonActivity: 'active',
    menuActivity: 'visible',
    bodyBlock: 'locked'
  };

  button.addEventListener('click', (e) =>{
    e.currentTarget.classList.toggle(classNames.buttonActivity);
    menu.classList.toggle(classNames.menuActivity);
    page.classList.toggle(classNames.bodyBlock);
  });
};

menuOpener();