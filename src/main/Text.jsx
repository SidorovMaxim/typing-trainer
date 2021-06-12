import React from 'react';


class Text extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      gameOver: false,
      chars: []
    };

    this.previous = {
      charNum: -1
    }

    this.getLoremIpsum = this.getLoremIpsum.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.charsToArray = this.charsToArray.bind(this);
  }

  // Custom methods
  getLoremIpsum() {
    fetch('https://baconipsum.com/api/?type=meat-and-filler&sentences=3&format=text')
      .then(res => res.text())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            chars: result
          });

          this.charsToArray();
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  charsToArray() {
    const { setNumOfChars, startСounter } = this.props;

    const chars = this.state.chars
      .replace(/\s\s/g, ' ')
      .split('')
      .map((item, j) => ({
        value: item,
        className: 'char'
      }));

    chars[0].className = 'char_current';

    setNumOfChars(chars.length);
    this.setState({ chars: chars });

    startСounter();
  }

  handleInputChange() {
    const { previous } = this;

    const { chars } = this.state;
    
    const {
      current,
      mistakes,
      finalText,
      setCurrent,
      setMistakes,
      setFinalText,
      handleFinish
    } = this.props;

    const fakeInput = document.querySelector('.fake-input');
    
    if (chars.length !== 0 &&
        fakeInput.value.length === 2) {
      const changeCharClass = (index, status) => {
        chars[index] = {
          ...chars[index],
          className: `char_${status}`
        };
      };

      const checkGameOver = () => {
        if (current === chars.length - 1) {
          this.setState({ gameOver: true });

          fakeInput.removeEventListener('input', this.handleInputChange);
          fakeInput.blur();

          return handleFinish();
        }
      };

      const changeFinalText = () => {
        if (previous.charNum !== current) {
          setFinalText([
            ...finalText,
            chars[current]
          ]);

          previous.charNum++;
        }
      };

      if (chars[current].value === fakeInput.value[1]) {
        changeCharClass(current, 'correct');
        checkGameOver();
        changeCharClass(current + 1, 'current');
        setCurrent(current + 1);

      } else {
        changeCharClass(current, 'incorrect');
        setMistakes(mistakes + 1);
      }

      changeFinalText();
      this.setState({ chars: chars });
    }

    // Reset entered char
    fakeInput.value = '_';
  }


  // Default methods
  componentDidMount() {
    const fakeInput = document.querySelector('.fake-input');

    this.getLoremIpsum();

    fakeInput.focus();
    fakeInput.addEventListener('input', this.handleInputChange);
  }


  render() {
    console.log('Text rendered');
    const { finalText } = this.props;

    const {
      error,
      isLoaded,
      gameOver,
      chars
    } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;

    } else if (gameOver) {
      return (
        finalText.map((item, j) => (
          <span className={item.className} key={'symbol' + j}>
            {item.value}
          </span>
        ))        
      );

    } else if (isLoaded && (typeof chars === 'object')) {

      return (
        chars.map((item, j) => (
          <span className={item.className} key={'symbol' + j}>
            {item.value}
          </span>
        ))
      );

    } else {
      return <div>Loading...</div>;
    }
  }
};


export default Text;
