import React from 'react';

class Text extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      letters: []
    };

    this.counterStartTime = 0;

    this.startСounter = this.startСounter.bind(this);
    this.getLoremIpsum = this.getLoremIpsum.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.lettersToArray = this.lettersToArray.bind(this);
  }

  // Custom methods
  getLoremIpsum() {
    fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=1&format=text')
      .then(res => res.text())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            letters: result
          });

          this.lettersToArray();
          this.startСounter();
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

  startСounter() {
    this.counterStartTime = new Date().getTime();

    setInterval(() => {
      this.props.setCounterTime(new Date().getTime() - this.counterStartTime);
    }, 1000)   
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

  // Default methods
  componentDidMount() {
    this.getLoremIpsum();

    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  // Render
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