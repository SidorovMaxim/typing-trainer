import React from 'react';
import Text from './Text.jsx';
import Speed from './params/Speed.jsx';
import Counter from './params/Counter.jsx';
import Mistakes from './params/Mistakes.jsx';
import Accuracy from './params/Accuracy.jsx';


export const NoticeContainer = () => {
  return (
    <div className='notice-container'>
      Type as quickly as possible,<br />
      making fewer mistakes,<br />
      to get a better score.

      <div className='prompt'>
        Press "Enter" to start
      </div>
    </div>
  );
};


export const ParamsContainer = (props) => {
  const {
    current,
    mistakes,
    counterTime,
    numOfChars
  } = props;

  return (
    <div className='params-container'>
      <Counter counterTime={counterTime} />
      <Mistakes mistakes={mistakes} />
      <Accuracy numOfChars={numOfChars} mistakes={mistakes} />
      <Speed counterTime={counterTime} current={current} />
    </div>  
  );
};


export const TextContainer = (props) => {
  const {
    current,
    mistakes,
    finalText,
    setCurrent,
    setMistakes,
    startСounter,
    setFinalText,
    handleFinish,
    setNumOfChars
  } = props;

  return (
    <div className='text-container'>
      <input
        className='fake-input'
        type='text'
        defaultValue='_' // Trick to disable first capital letter when using virtual keyboard
      />
      <Text
        current={current}
        mistakes={mistakes}
        finalText={finalText}
        setCurrent={setCurrent}
        setMistakes={setMistakes}
        startСounter={startСounter}
        setFinalText={setFinalText}
        handleFinish={handleFinish}
        setNumOfChars={setNumOfChars}
      />
    </div>
  );
};


export const ScoreContainer = (props) => {
  const {
    current,
    mistakes,
    counterTime,
    numOfChars
  } = props;

  const score = Math.round(
    current /
    (counterTime / 10e2 / 60) *
    (numOfChars - mistakes) /
    numOfChars
  );

  return (
    <div className='score-container'>
      <div className='result'>
        Good job!
      </div>

      <div className='score'>
        Your score: {score}
      </div>
    </div>
  );
};
