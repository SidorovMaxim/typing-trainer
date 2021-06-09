import React from 'react';
//import TextSymbol from './TextSymbol.jsx';

class Text extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      letters: []
    };

    this.startTime = 0;

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.lettersToArray = this.lettersToArray.bind(this);
  }

  lettersToArray() {
    const { setNumOfLetters } = this.props;

    const letters = this.state.letters
      .replace(/\s\s/g, ' ')
      .split('')
      .map(item => ({
        value: item,
        className: 'letter'
    }));

    setNumOfLetters(letters.length);

    this.setState({letters: letters});
  }

  handleKeyUp(event) {
    const { key, repeat } = event;
    const { letters } = this.state;
    const { current, setCurrent, mistakes, setMistakes} = this.props;

    if (repeat === false && key.length === 1) {
      let className;

      if (key === letters[current].value) {
        className = 'letter_correct';
        setCurrent(current + 1);

      } else {
        className = 'letter_incorrect';
        setMistakes(mistakes + 1);
      }

      letters[current] = {
        ...letters[current],
        className: className
      };
      
      this.setState({
        letters: letters
      });
    }
  }

  componentDidMount() {
    fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=1&format=text')
      .then(res => res.text())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            letters: result
          });

          this.lettersToArray();
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );

    document.onkeydown = this.handleKeyUp;

    this.startTime = new Date().getTime();

    setInterval(() => {
      this.props.setTime(new Date().getTime() - this.startTime);
    }, 1000)
  }

  render() {
    const { error, isLoaded, letters } = this.state;

    if (error) {
      return <div>Ошибка: {error.message}</div>;

    } else if (isLoaded && (typeof letters === 'object')) {
      return (
        letters.map((item, j) => (
          <span className={item.className} key={'symbol' + j}>
            {item.value}
          </span>
        ))
      );

    } else {
      return <div>Загрузка...</div>;
    }
  }
};

export default Text;