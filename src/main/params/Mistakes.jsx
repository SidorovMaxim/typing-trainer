import React from 'react';


const Mistakes = (props) => {
  const { mistakes } = props;

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


export default Mistakes;