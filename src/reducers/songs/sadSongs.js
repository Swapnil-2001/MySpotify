import { SET_SAD_SONGS } from '../../utils/constants';

const sadSongsReducer = (state = [], action) => {
  const { song } = action;
  switch (action.type) {
    case SET_SAD_SONGS:
      return [...state, song];
    default:
      return state;
  }
};

export default sadSongsReducer;