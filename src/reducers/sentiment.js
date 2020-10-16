import { SET_SENTIMENT } from '../utils/constants';

const sentimentReducer = (state = [], action) => {
  const { valence } = action;
  switch (action.type) {
    case SET_SENTIMENT:
      if (state.length === 40) {
        return [valence];
      } else {
        return [...state, valence];
      }
    default:
      return state;
  }
};

export default sentimentReducer;