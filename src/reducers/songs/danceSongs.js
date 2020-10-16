import { SET_DANCE_SONGS } from '../../utils/constants';

const danceSongsReducer = (state = [], action) => {
  const { song } = action;
  switch (action.type) {
    case SET_DANCE_SONGS:
      return [...state, song];
    default:
      return state;
  }
};

export default danceSongsReducer;