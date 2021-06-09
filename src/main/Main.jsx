import React, {useState} from 'react';
import Text from './Text.jsx';

const Main = () => {
  const [onStart, setOnStart] = useState(false);
  const [mistakes, setMistakes] = useState(0);

  const handleOnStart = () => {
    setOnStart(true);
  }

  if (onStart) {
    return (
      <section>
        <div className='text-container'>
          <Text mistakes={mistakes} setMistakes={setMistakes} />
        </div>
        <div className='params-container'>
          <span>
            {mistakes}
          </span>
        </div>
      </section>
    );

  } else {
    return (
      <section>
        <button className='button-start' onClick={handleOnStart}>Я готов!</button>
      </section>
    );
  }
};

export default Main;
