import React from 'react';
import { connect } from 'react-redux';
import { getHappySongs } from '../../actions/results';

function HappySongs({ id, dispatch }) {
  const happySongs = (id) => {
    dispatch(getHappySongs(id)).then(() => {});
  };
  happySongs(id);
  return (
    <div>
    </div>
  );
};

export default connect()(HappySongs);