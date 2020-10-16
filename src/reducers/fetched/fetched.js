import { SET_FETCHED } from '../../utils/constants';

const fetchedReducer = (state = false, action) => {
  switch (action.type) {
    case SET_FETCHED:
      return true;
    default:
      return state;
  }
}

export default fetchedReducer;