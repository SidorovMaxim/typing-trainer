import './App.css';
import React, {createContext, useState} from 'react';
import Header from './header/Header.jsx';
import Main from './main/Main.jsx';
import Footer from './footer/Footer.jsx';

export const TextContext = createContext();

function App() {
  const [onStart, setOnStart] = useState(false);
  const [letters, setLetters] = useState([]);
  const [currentLetter, setCurrentLetter] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  return (
    <TextContext.Provider 
      value={{
      }}
    >

      <Header />
      <Main />
      <Footer />

    </TextContext.Provider>
  );
}

export default App;
