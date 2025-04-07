"use client";
import { useState } from 'react';
import './App.css';
import BackgroundAnimate from './BackgroundAnimate';
import InputShortener from './InputShortener';
import LinkResult from './LinkResult';

function App() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="container">
      <InputShortener setInputValue={setInputValue} />
      <BackgroundAnimate />
      <LinkResult inputValue={inputValue} />
      <footer className="footer">
      <p><a href="https://andressoler.netlify.app/" target="_blank" className='Link'>© Andres Soler</a> | 2025 | All rights reserved</p>
      </footer>
    </div>
    
  );
}

export default App;