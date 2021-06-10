import React, { useState } from 'react';
import Text from './Text.jsx';
import Mistakes from './params/Mistakes.jsx';
import Accuracy from './params/Accuracy.jsx';
import Speed from './params/Speed.jsx';
import Counter from './params/Counter.jsx';


const Main = () => {

  // Init state
  const [current, setCurrent] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [onStart, setOnStart] = useState(false);
  const [counterTime, setCounterTime] = useState(0);
  const [numOfLetters, setNumOfLetters] = useState(0);

  // Init variables
  let counterStartTime;

  // Custom methods
  const handleOnStart = () => {
    setOnStart(true);
  }

  const startСounter = () => {
    counterStartTime = new Date().getTime();

    setInterval(() => {
      setCounterTime(new Date().getTime() - counterStartTime);
    }, 1000);
  }

  // Render
  if (onStart) {
    //console.log('Main rendered');
    return (
      <section>
        <div className='params-container'>
          <Counter counterTime={counterTime} />
          <Mistakes mistakes={mistakes} />
          <Accuracy numOfLetters={numOfLetters} mistakes={mistakes} />
          <Speed counterTime={counterTime} current={current} />
        </div>

        <div className='text-container'>
          <Text
            current={current}
            mistakes={mistakes}
            setCurrent={setCurrent}
            setMistakes={setMistakes}
            startСounter={startСounter}
            setNumOfLetters={setNumOfLetters}
          />
        </div>
      </section>
    );

  } else {
    return (
      <section>
        <div className='notice-container'>
          Type the text as quickly as possible,<br />
          making fewer mistakes<br /> 
          to get the most points. 
        </div>

        <button 
          className='button-start' 
          onClick={handleOnStart}>
          I'm ready!
        </button>
      </section>
    );
  }
};

export default Main;
