import { SET_FETCHED_SIMILAR } from '../../utils/constants';

const fetchedReducer = (state = false, action) => {
  switch (action.type) {
    case SET_FETCHED_SIMILAR:
      return true;
    default:
      return state;
  }
}

export default fetchedReducer;