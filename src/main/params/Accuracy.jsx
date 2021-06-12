import React, { useContext } from 'react';
import { AppContext } from '../../App.js';


const Accuracy = (props) => {
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


export default Accuracy;
