import React from 'react';
import { connect } from 'react-redux';
import { getModerateSongs } from '../../actions/results';

function ModerateSongs({ id, dispatch }) {
  const moderateSongs = (id) => {
    dispatch(getModerateSongs(id)).then(() => {});
  };
  moderateSongs(id);
  return (
    <div>
    </div>
  );
};

export default connect()(ModerateSongs);