import { SET_SIMILAR } from '../utils/constants';

const similarArtistsReducer = (state = [], action) => {
  const { artists } = action;
  switch (action.type) {
    case SET_SIMILAR:
      if (state.length === 60) {
        return state;
      }
      return [
        ...state,
        ...artists
      ];
    default:
      return state;
  }
};

export default similarArtistsReducer;