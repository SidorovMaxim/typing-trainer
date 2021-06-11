import React, { useState } from 'react';
import Text from './Text.jsx';
import Mistakes from './params/Mistakes.jsx';
import Accuracy from './params/Accuracy.jsx';
import Speed from './params/Speed.jsx';
import Counter from './params/Counter.jsx';


let counter;


const Main = () => {
  const [current, setCurrent] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [finalText, setFinalText] = useState([]);
  const [counterTime, setCounterTime] = useState(0);
  const [numOfLetters, setNumOfLetters] = useState(0);
  const [appState, setAppState] = useState('preparation');


  const handleStart = () => {
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


  const paramsContainer = (
    <div className='params-container'>
      <Counter counterTime={counterTime} />
      <Mistakes mistakes={mistakes} />
      <Accuracy numOfLetters={numOfLetters} mistakes={mistakes} />
      <Speed counterTime={counterTime} current={current} />
    </div>
  );
  
  const textContainer = (
    <div className='text-container'>
      <Text
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
    </div>
  );

  const buttonRestart = (
    <a className='button-restart' href='/'>
      Restart
    </a>
  );

  const finishContainer = (
    <div className='finish-container'>
      <div className='result-text'>
        Good job!
      </div>

      <div className='score-text'>
        Your score: 777
      </div>
    </div>
  );


  if (appState === 'start') {
    return (
      <section>
        {paramsContainer}
        {textContainer}
        {buttonRestart}
      </section>
    );

  } else if (appState === 'finish') {
    return (
      <section>
        {paramsContainer}
        {textContainer}
        {finishContainer}
        {buttonRestart}
      </section>
    );

  } else if (appState === 'preparation') {
    return (
      <section>
        <div className='notice-container'>
          Type the text as quickly as possible,<br />
          making fewer mistakes<br /> 
          to get the most points. 
        </div>

        <button
          className='button-start' 
          onClick={handleStart}
        >
          I'm ready!
        </button>
      </section>
    );
  }
};


export default Main;
