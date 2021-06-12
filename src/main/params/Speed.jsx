import React, { useContext } from 'react';
import { AppContext } from '../../App.js';


const Speed = (props) => {
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


export default Speed;
