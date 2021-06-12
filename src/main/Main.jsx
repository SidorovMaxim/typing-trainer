import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App.js';
import { ButtonStart, ButtonRestart } from './Buttons.jsx';
import { NoticeContainer, ParamsContainer, TextContainer, ScoreContainer } from './Containers.jsx';


let counter;


const Main = () => {

  // Init context
  const { setCounterTime } = useContext(AppContext);


  // Init state
  const [appState, setAppState] = useState('preparation');


  // Custom methods
  const startСounter = () => {
    const counterStartTime = new Date().getTime();

    counter = setInterval(() => {
      setCounterTime(new Date().getTime() - counterStartTime);
    }, 1000);
  };

  // Event handlers
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

  // Default methods
  useEffect(() => {
    document.addEventListener('keydown', handleEnter);
  }, []); // eslint-disable-line


  // Render
  const textContainer = (
    <TextContainer
      startСounter={startСounter}
      handleFinish={handleFinish}
    />
  );

  if (appState === 'start') {
    return (
      <section>
        <ParamsContainer />
        {textContainer}
        <ButtonRestart />
      </section>
    );

  } else if (appState === 'finish') {
    return (
      <section>
        <ParamsContainer />
        {textContainer}
        <ScoreContainer />
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
