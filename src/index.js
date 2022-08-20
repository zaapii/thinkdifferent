import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBcEYbloT8f-afJPn-TcLUQ5tbgLbdyb4",
  authDomain: "thinkdifferent-56240.firebaseapp.com",
  projectId: "thinkdifferent-56240",
  storageBucket: "thinkdifferent-56240.appspot.com",
  messagingSenderId: "840358170063",
  appId: "1:840358170063:web:5a9ef35ac17d2998cad6ba"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
