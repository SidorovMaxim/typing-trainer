import React, { useContext } from 'react';
import { AppContext } from '../../App.js';


const Counter = (props) => {
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


export default Counter;