import { SET_MODERATE_SONGS } from '../../utils/constants';

const moderateSongsReducer = (state = [], action) => {
  const { song } = action;
  switch (action.type) {
    case SET_MODERATE_SONGS:
      return [...state, song];
    default:
      return state;
  }
};

export default moderateSongsReducer;