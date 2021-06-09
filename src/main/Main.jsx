import React, {useState, useEffect, useContext} from 'react';
import { TextContext } from '../App.js';
import Text from './Text.jsx';

const Main = () => {

  // Init state
  const [onStart, setOnStart] = useState(false);
  const [time, setTime] = useState(1);
  const [current, setCurrent] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [numOfLetters, setNumOfLetters] = useState(0);

  // Custom methods
  const handleOnStart = () => {
    setOnStart(true);
  }

  // Render
  if (onStart) {
    const accuracy = Math.round(10 * (numOfLetters - mistakes) * 100 / numOfLetters) / 10;
    const speed = Math.round(current / (time / 1000 / 60));

    return (
      <section>
        <div className='text-container'>
          <Text 
            current={current}
            setCurrent={setCurrent}
            mistakes={mistakes}
            setMistakes={setMistakes}
            setNumOfLetters={setNumOfLetters}
            setTime={setTime}
          />
        </div>

        <div className='params-container'>
          <span className='params'>
            Точность: {accuracy} %
          </span>

          <span className='params'>
            Ошибок: {mistakes}
          </span>

          <br />

          <span className='params'>
            Скорость: {speed} зн./мин
          </span>        

          <span className='params'>
            Время: {Math.floor(time / 1000)} сек
          </span>   
        </div>
      </section>
    );

  } else {
    return (
      <section>
        <button 
          className='button-start' 
          onClick={handleOnStart}>
          Я готов!
        </button>
      </section>
    );
  }
};

export default Main;
