import React from 'react';
import { connect } from 'react-redux';
import { getSentiment } from '../../actions/results';

function Song({ id, dispatch }) {
  async function sentimentAnalyzer(id) {
    await dispatch(getSentiment(id))
  }
  sentimentAnalyzer(id);
  return (
    <div>
    </div>
  );
};

export default connect()(Song);