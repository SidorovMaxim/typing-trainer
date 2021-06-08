import React, {useState, useEffect} from 'react';

const Text = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState('');

  useEffect(() => {
    fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=1&format=text')
      .then(res => res.text())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      items.split('').map((item, j) => (
        <span className='letter' key={'letter' + j}>
          {item}
        </span>
      ))
    );
  }
}

export default Text;