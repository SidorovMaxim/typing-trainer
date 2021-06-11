import React from 'react';


class Text extends React.Component {
  constructor(props) {
    super(props);

    this.previous = {
      value: -1
    }

    this.state = {
      error: null,
      isLoaded: false,
      gameOver: false,
      letters: []
    };

    this.getLoremIpsum = this.getLoremIpsum.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.lettersToArray = this.lettersToArray.bind(this);
  }


  // Custom methods
  getLoremIpsum() {
    fetch('https://baconipsum.com/api/?type=meat-and-filler&sentences=1&format=text')
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
  }

  lettersToArray() {
    const { setNumOfLetters, startСounter } = this.props;

    const letters = this.state.letters
      .replace(/\s\s/g, ' ')
      .split('')
      .map((item, j) => ({
        value: item,
        className: 'letter'
      }));

    letters[0].className = 'letter_current';

    setNumOfLetters(letters.length);
    this.setState({ letters: letters });
    startСounter();
  }

  handleKeyDown(event) {
    const { previous } = this;
    const { key, repeat } = event;
    const { letters } = this.state;
    const {
      current,
      mistakes,
      finalText,
      setCurrent,
      setMistakes,
      setFinalText,
      handleFinish
    } = this.props;

    const checkGameOver = () => {
      if (current === letters.length - 1) {
        document.removeEventListener('keydown', this.handleKeyDown);
        this.setState({ gameOver: true });
        return handleFinish();
      }
    }

    if (letters.length !== 0 &&
        repeat === false &&
        key.length === 1) {

      if (key === letters[current].value) {
        changeLetterClass(current, 'correct');
        checkGameOver();
        changeLetterClass(current + 1, 'current');
        setCurrent(current + 1);

      } else {
        changeLetterClass(current, 'incorrect');
        setMistakes(mistakes + 1);
      }

      changeFinalText();
      this.setState({ letters: letters });
    }

    function changeLetterClass(index, status) {
      letters[index] = {
        ...letters[index],
        className: `letter_${status}`
      };
    }

    function changeFinalText() {
      if (previous.value !== current) {
        setFinalText([
          ...finalText,
          letters[current]
        ]);

        previous.value++;
      }
    }
  }


  // Default methods
  componentDidMount() {
    this.getLoremIpsum();
    document.addEventListener('keydown', this.handleKeyDown);
  }


  render() {
    const { finalText } = this.props;

    const {
      error,
      isLoaded,
      gameOver,
      letters
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

    } else if (isLoaded && (typeof letters === 'object')) {
      return (
        letters.map((item, j) => (
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
