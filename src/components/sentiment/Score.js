import React from 'react';

function Score({ sentiment }) {
  const score = sentiment.reduce((accumulator, currentValue) =>
    accumulator + currentValue
  ) / sentiment.length;
  let state;
  if (score >= 0.6) {
    state = 'happy';
  } else if (score >= 0.4) {
    state = 'moderately happy';
  } else {
    state = 'sad';
  }
  return (
    <div>
      You are {state}!
    </div>
  )
}

export default Score;