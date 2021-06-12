import React, { useContext } from 'react';
import { AppContext } from '../App.js';


export const Counter = () => {
  const { counterTime } = useContext(AppContext);

  const counterTimeSeconds = Math.round(counterTime / 10e2);

  return (
    <span className="params">
      <div className="params-name">
        Time:
      </div>

      <div className="params-value">
        {counterTimeSeconds}
      </div>

      <div className="params-units">
        sec
      </div>
    </span>
  );
};


export const Mistakes = () => {
  const { mistakes } = useContext(AppContext);

  return (
    <span className="params">
      <div className="params-name">
        Mistakes:
      </div>

      <div className="params-value">
        {mistakes}
      </div>
    </span>
  );
};


export const Accuracy = () => {
  const {
    mistakes,
    numOfChars
  } = useContext(AppContext);

  const accuracy = Math.round(10 * (numOfChars - mistakes) * 100 / numOfChars) / 10;

  const color = {
    r: (accuracy > 75) ? (1020 - 10.2 * accuracy) : 255,
    g: (accuracy > 75) ? (4.08 * accuracy - 204) : 102,
    b: 102
  }
  const colorStyle = `rgb(${color.r}, ${color.g}, ${color.b})`

  return (
    <span className="params">
      <div className="params-name">
        Accuracy:
      </div>

      <div className="params-value" style={{color: colorStyle}}>
        {isNaN(accuracy) ? 100 : accuracy}
      </div>

      <div className="params-units">
        %
      </div>
    </span>
  );
};


export const Speed = () => {
  const {
    current,
    counterTime
  } = useContext(AppContext);

  const speed = Math.round(current / (counterTime / 10e2 / 60));

  const color = {
    r: (speed < 150) ? (255 - 1.7 * speed) : 0,
    g: (speed < 150) ? (102 + 0.68 * speed) : 204,
    b: 102
  }
  const colorStyle = `rgb(${color.r}, ${color.g}, ${color.b})`

  return (
    <span className="params">
      <div className="params-name">
        Speed:
      </div>

      <div className="params-value" style={{color: colorStyle}}>
        {isNaN(speed) ? 0 : speed}
      </div>

      <div className="params-units">
        chars/min
      </div>
    </span>
  );
};


export const Score = () => {
  const {
    current,
    mistakes,
    numOfChars,
    counterTime
  } = useContext(AppContext);

  const score = Math.round(
    current /
    (counterTime / 10e2 / 60) *
    (numOfChars - mistakes) /
    numOfChars
  );

  return (
    <div className="score">
      Your score: {score}
    </div>
  );
};
