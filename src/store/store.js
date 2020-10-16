import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sentimentReducer from '../reducers/sentiment';
import setHappySongs from '../reducers/songs/happySongs';
import setDanceSongs from '../reducers/songs/danceSongs';
import setSadSongs from '../reducers/songs/sadSongs';
import setModerateSongs from '../reducers/songs/moderateSongs';
import similarArtistsReducer from '../reducers/similar';
import fetched from '../reducers/fetched/fetched';
import fetchedSimilar from '../reducers/fetched/fetchedSimilar';
const composeEnhancers = typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const store = createStore(
  combineReducers({
    sentiment: sentimentReducer,
    happySongs: setHappySongs,
    danceSongs: setDanceSongs,
    moderateSongs: setModerateSongs,
    sadSongs: setSadSongs,
    fetched: fetched,
    fetchedSimilar: fetchedSimilar,
    similar: similarArtistsReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;