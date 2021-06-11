import React from 'react';
import Text from './Text.jsx';
import Speed from './params/Speed.jsx';
import Counter from './params/Counter.jsx';
import Mistakes from './params/Mistakes.jsx';
import Accuracy from './params/Accuracy.jsx';


export const NoticeContainer = () => {
  return (
    <div className='notice-container'>
      Type the text as quickly as possible,<br />
      making fewer mistakes<br /> 
      to get the most points. 
    </div>
  );
};


export const ParamsContainer = (props) => {
  const {
    current,
    mistakes,
    counterTime,
    numOfLetters
  } = props;

  return (
    <div className='params-container'>
      <Counter counterTime={counterTime} />
      <Mistakes mistakes={mistakes} />
      <Accuracy numOfLetters={numOfLetters} mistakes={mistakes} />
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
    setNumOfLetters
  } = props;

  return (
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
};


export const ScoreContainer = (props) => {
  const {
    current,
    mistakes,
    counterTime,
    numOfLetters
  } = props;

  const score = Math.round(
    current /
    (counterTime / 10e2 / 60) *
    (numOfLetters - mistakes) /
    numOfLetters
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
