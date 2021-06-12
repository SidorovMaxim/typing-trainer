import React, { useContext } from 'react';
import { AppContext } from '../../App.js';


const Mistakes = (props) => {
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


export default Mistakes;