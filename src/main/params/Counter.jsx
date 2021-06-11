import React from 'react';


const Counter = (props) => {
  const { counterTime } = props;

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
}


export default Counter;