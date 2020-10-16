import React from 'react';
import { connect } from 'react-redux';
import { getSadSongs } from '../../actions/results';

function SadSongs({ id, dispatch }) {
  const sadSongs = (id) => {
    dispatch(getSadSongs(id)).then(() => {});
  };
  sadSongs(id);
  return (
    <div>
    </div>
  );
};

export default connect()(SadSongs);