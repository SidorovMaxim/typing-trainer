import React from 'react';
//import TextSymbol from './TextSymbol.jsx';

class Text extends React.Component {
  constructor(props) {
    super(props);

    this.mistakes = this.props.mistakes;
    this.setMistakes = this.props.setMistakes;

    this.state = {
      error: null,
      isLoaded: false,
      letters: [],
      current: 0
    };

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.lettersToArray = this.lettersToArray.bind(this);
  }

  lettersToArray() {
    const letters = this.state.letters
      .replace('  ', ' ')
      .split('')
      .map(item => ({
        value: item,
        className: 'letter'
    }));

    this.setState({letters: letters});
  }

  handleKeyUp(event) {
    const { key, repeat } = event;
    const { letters, current } = this.state;

    if (repeat === false && key.length === 1) {
      let className, inc = 0;

      if (key === letters[current].value) {
        className = 'letter_correct';
        inc++;

      } else {
        className = 'letter_incorrect';
        this.setMistakes(++this.mistakes);
      }

      letters[current] = {
        ...letters[current],
        className: className
      };
      
      this.setState({
        letters: letters,
        current: current + inc
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