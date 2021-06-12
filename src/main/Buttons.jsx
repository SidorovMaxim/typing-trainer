import React from 'react';


export const ButtonStart = (props) => {
  const { handleStart } = props;

  return (
    <button
      className="button-start"
      onClick={handleStart}
    >
      I'm ready!
    </button>
  );
};


export const ButtonRestart = () => {
  return (
    <a className="button-restart" href="/">
      Restart
    </a>
  );
};
