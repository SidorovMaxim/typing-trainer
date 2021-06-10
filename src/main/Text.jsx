import React from 'react';

class Text extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      letters: []
    };

    this.getLoremIpsum = this.getLoremIpsum.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.lettersToArray = this.lettersToArray.bind(this);
  }

  // Custom methods
  getLoremIpsum() {
    fetch('https://baconipsum.com/api/?type=meat-and-filler&sentences=4&format=text')
      .then(res => res.text())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            letters: result
          });

          this.lettersToArray();
          this.props.startСounter();
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

  handleKeyDown(event) {
    const { key, repeat } = event;
    const { letters } = this.state;
    const { current, setCurrent, mistakes, setMistakes} = this.props;

    if (
        letters.length !== 0 &&
        repeat === false &&
        key.length === 1
      ) {

      if (key === letters[current].value) {
        letters[current] = {
          ...letters[current],
          className: 'letter_correct'
        };

        letters[current + 1] = {
          ...letters[current + 1],
          className: 'letter_current'
        };       

        setCurrent(current + 1);

      } else {
        letters[current] = {
          ...letters[current],
          className: 'letter_incorrect'
        };

        setMistakes(mistakes + 1);
      }

      this.setState({letters: letters});
    }
  }

  // Default methods
  componentDidMount() {
    this.getLoremIpsum();

    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { error, isLoaded, letters } = this.state;
    //console.log('Text rendered');

    if (error) {
      return <div>Error: {error.message}</div>;

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