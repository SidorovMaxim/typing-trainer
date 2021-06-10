import React, {useState, useEffect, useContext} from 'react';
import { TextContext } from '../App.js';
import Text from './Text.jsx';

const Main = () => {

  // Init state
  const [current, setCurrent] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [onStart, setOnStart] = useState(false);
  const [counterTime, setCounterTime] = useState(1);
  const [numOfLetters, setNumOfLetters] = useState(0);

  // Custom methods
  const handleOnStart = () => {
    setOnStart(true);
  }

  // Render
  if (onStart) {
    const counterTimeSeconds = Math.floor(counterTime / 10e2);    
    const speed = Math.round(current / (counterTimeSeconds / 60));
    const accuracy = Math.round(10 * (numOfLetters - mistakes) * 100 / numOfLetters) / 10;

    return (
      <section>
        <div className='text-container'>
          <Text
            current={current}
            mistakes={mistakes}
            setCurrent={setCurrent}
            setMistakes={setMistakes}
            setCounterTime={setCounterTime}
            setNumOfLetters={setNumOfLetters}
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
            Скорость: {isNaN(speed) ? 0 : speed} зн./мин
          </span>        

          <span className='params'>
            Время: {counterTimeSeconds} сек
          </span>   
        </div>
      </section>
    );

  } else {
    return (
      <section>
        <div className='notice-container'>
          Печатай как можно быстрее,<br />
          допуская меньше ошибок,<br /> 
          чтобы заработать наибольше количество очков.
        </div>

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
