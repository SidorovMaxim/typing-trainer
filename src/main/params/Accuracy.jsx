import React from 'react';


const Accuracy = (props) => {
  const {
    numOfLetters,
    mistakes
  } = props;

  const accuracy = Math.round(10 * (numOfLetters - mistakes) * 100 / numOfLetters) / 10;

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
