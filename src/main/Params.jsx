import React, { useContext } from 'react';
import { AppContext } from '../App.js';


export const Counter = (props) => {
  const { counterTime } = useContext(AppContext);

  const counterTimeSeconds = Math.round(counterTime / 10e2);

  return (
    <span className='params'>
      <div className='params-name'>
        Time:
      </div>

      <div className='params-value'>
        {counterTimeSeconds}
      </div>

      <div className='params-units'>
        sec
      </div>
    </span>
  );
};


export const Mistakes = (props) => {
  const { mistakes } = useContext(AppContext);

  return (
    <span className='params'>
      <div className='params-name'>
        Mistakes:
      </div>

      <div className='params-value'>
        {mistakes}
      </div>
    </span>
  );
};


export const Accuracy = (props) => {
  const {
    numOfChars,
    mistakes
  } = useContext(AppContext);

  const accuracy = Math.round(10 * (numOfChars - mistakes) * 100 / numOfChars) / 10;

  return (
    <span className='params'>
      <div className='params-name'>
        Accuracy:
      </div>

      <div className='params-value'>
        {isNaN(accuracy) ? 100 : accuracy}
      </div>

      <div className='params-units'>
        %
      </div>
    </span>
  );
};


export const Speed = (props) => {
  const {
    counterTime,
    current
  } = useContext(AppContext);

  const speed = Math.round(current / (counterTime / 10e2 / 60));

  return (
    <span className='params'>
      <div className='params-name'>
        Speed:
      </div>

      <div className='params-value'>
        {isNaN(speed) ? 0 : speed}
      </div>

      <div className='params-units'>
        chars/min
      </div>
    </span>
  );
};
