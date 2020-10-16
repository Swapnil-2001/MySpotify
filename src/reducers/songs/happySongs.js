import { SET_HAPPY_SONGS } from '../../utils/constants';

const happySongsReducer = (state = [], action) => {
  const { song } = action;
  switch (action.type) {
    case SET_HAPPY_SONGS:
      return [...state, song];
    default:
      return state;
  }
};

export default happySongsReducer;