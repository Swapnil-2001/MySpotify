import React from 'react';
import { connect } from 'react-redux';
import { getDanceSongs } from '../../actions/results';

function DanceSongs({ id, dispatch }) {
  const danceSongs = (id) => {
    dispatch(getDanceSongs(id)).then(() => {});
  };
  danceSongs(id);
  return (
    <div>
    </div>
  );
};

export default connect()(DanceSongs);