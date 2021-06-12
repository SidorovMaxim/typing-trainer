import './App.css';
import React, { createContext, useState } from 'react';
import Header from './header/Header.jsx';
import Main from './main/Main.jsx';
import Footer from './footer/Footer.jsx';


export const AppContext = createContext();


function App() {

  // Init state
  const [current, setCurrent] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [finalText, setFinalText] = useState([]);
  const [numOfChars, setNumOfChars] = useState(0);
  const [counterTime, setCounterTime] = useState(0);

  // Render
  return (
    <AppContext.Provider 
      value={{
        current,
        setCurrent,
        mistakes,
        setMistakes,
        finalText,
        setFinalText,
        numOfChars,
        setNumOfChars,
        counterTime,
        setCounterTime
      }}
    >
      <Header />
      <Main />
      <Footer />
    </AppContext.Provider>
  );
}


export default App;
