import React, { useContext } from 'react';
import { AppContext } from '../App.js';
import Text from './Text.jsx';
import { Counter, Mistakes, Accuracy, Speed, Score } from './Params.jsx';


export const NoticeContainer = () => {
  return (
    <div className="notice-container">
      Type as quickly as possible,<br />
      making fewer mistakes,<br />
      to get a better score.

      <div className="prompt">
        Press "Enter" to start
      </div>
    </div>
  );
};


export const ParamsContainer = () => {
  return (
    <div className="params-container">
      <Counter />
      <Mistakes />
      <Accuracy />
      <Speed />
    </div>
  );
};


export const TextContainer = (props) => {
  const {
    startСounter,
    handleFinish
  } = props;

  const {
    current,
    mistakes,
    finalText,
    setCurrent,
    setMistakes,
    setFinalText,
    setNumOfChars
  } = useContext(AppContext);

  return (
    <div className="text-container">
      <input
        className="fake-input"
        type="text"
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


export const ScoreContainer = () => {
  return (
    <div className="score-container">
      <div className="result">
        Good job!
      </div>

      <Score />
    </div>
  );
};
