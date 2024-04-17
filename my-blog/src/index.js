import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeuIHFZ3_h7AGTbvBhv9Bt1R78dNi26NQ",
  authDomain: "my-react-blog-7ab08.firebaseapp.com",
  projectId: "my-react-blog-7ab08",
  storageBucket: "my-react-blog-7ab08.appspot.com",
  messagingSenderId: "835863943349",
  appId: "1:835863943349:web:9c3a4cccd553d3356286fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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
