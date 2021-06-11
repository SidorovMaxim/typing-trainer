import React, { useState, useEffect } from 'react';
import { ButtonStart, ButtonRestart } from './Buttons.jsx';
import { NoticeContainer, ParamsContainer, TextContainer, ScoreContainer } from './Containers.jsx';


let counter;


const Main = () => {

  // State
  const [current, setCurrent] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [finalText, setFinalText] = useState([]);
  const [counterTime, setCounterTime] = useState(0);
  const [numOfLetters, setNumOfLetters] = useState(0);
  const [appState, setAppState] = useState('preparation');

  // Custom methods
  const handleEnter = (event) => {
    if (event.key === 'Enter') handleStart();
  }

  const handleStart = () => {
    document.removeEventListener('keydown', handleEnter);
    setAppState('start');
  };

  const handleFinish = () => {
    clearInterval(counter);
    setAppState('finish');
  };

  const startСounter = () => {
    const counterStartTime = new Date().getTime();

    counter = setInterval(() => {
      setCounterTime(new Date().getTime() - counterStartTime);
    }, 1000);
  };

  // Default methods
  useEffect(() => {
    document.addEventListener('keydown', handleEnter);
  }, []); // eslint-disable-line


  // Render
  const paramsContainer = (
    <ParamsContainer
      current={current}
      mistakes={mistakes}
      counterTime={counterTime}
      numOfLetters={numOfLetters}
    />  
  );

  const textContainer = (
    <TextContainer
      current={current}
      mistakes={mistakes}
      finalText={finalText}
      setCurrent={setCurrent}
      setMistakes={setMistakes}
      startСounter={startСounter}
      setFinalText={setFinalText}
      handleFinish={handleFinish}
      setNumOfLetters={setNumOfLetters}
    />  
  );

  const scoreContainer = (
    <ScoreContainer
      current={current}
      mistakes={mistakes}
      counterTime={counterTime}
      numOfLetters={numOfLetters}
    />
  );

  if (appState === 'start') {
    return (
      <section>
        {paramsContainer}
        {textContainer}
        <ButtonRestart />
      </section>
    );

  } else if (appState === 'finish') {
    return (
      <section>
        {paramsContainer}
        {textContainer}
        {scoreContainer}
        <ButtonRestart />
      </section>
    );

  } else if (appState === 'preparation') {
    return (
      <section>
        <NoticeContainer />
        <ButtonStart handleStart={handleStart} />
      </section>
    );
  }
};


export default Main;
