import {
  SET_SENTIMENT,
  SET_HAPPY_SONGS,
  SET_DANCE_SONGS,
  SET_SAD_SONGS,
  SET_MODERATE_SONGS,
  SET_FETCHED,
  SET_FETCHED_SIMILAR,
  SET_SIMILAR
} from '../utils/constants';
import * as SpotifyFunctions from '../components/spotifyFunctions.js'
import { get } from '../utils/api';

export const setSentiment = (id, valence, danceability) => ({
  type: SET_SENTIMENT,
  valence: [id, valence, danceability]
})

export const setHappySongs = (song) => ({
  type: SET_HAPPY_SONGS,
  song
})

export const setDanceSongs = (song) => ({
  type: SET_DANCE_SONGS,
  song
})
export const setSadSongs = (song) => ({
  type: SET_SAD_SONGS,
  song
})
export const setModerateSongs = (song) => ({
  type: SET_MODERATE_SONGS,
  song
})

export const setFetched = () => ({
  type: SET_FETCHED
})
export const setSimilar = (artists) => ({
  type: SET_SIMILAR,
  artists
})

export const setFetchedSimilar = () => ({
  type: SET_FETCHED_SIMILAR
})

export const getHappySongs = id => async (dispatch) => {
  const API_URL = `https://api.spotify.com/v1/tracks/${id}`;
  try {
    const result = await get(API_URL);
    dispatch(setHappySongs(result));
  } catch (error) {
    console.log('error', error);
  }
};

export const getDanceSongs = id => async (dispatch) => {
  const API_URL = `https://api.spotify.com/v1/tracks/${id}`;
  try {
    const result = await get(API_URL);
    dispatch(setDanceSongs(result));
  } catch (error) {
    console.log('error', error);
  }
};

export const getRelatedArtists = id => async (dispatch) => {
  try {
    console.log('related');
    const relatedArtists = await SpotifyFunctions.getRelatedArtists(id);
    dispatch(setSimilar(relatedArtists.artists));
  } catch (error) {
    console.log('error', error);
  }
};

export const getSadSongs = id => async (dispatch) => {
  const API_URL = `https://api.spotify.com/v1/tracks/${id}`;
  try {
    const result = await get(API_URL);
    dispatch(setSadSongs(result));
  } catch (error) {
    console.log('error', error);
  }
};

export const getModerateSongs = id => async (dispatch) => {
  try {
    const API_URL = `https://api.spotify.com/v1/tracks/${id}`;
    const result = await get(API_URL);
    return dispatch(setModerateSongs(result));
  } catch (error) {
    console.log('error', error);
  }
};

export const getSentiment = id => async (dispatch) => {
  const API_URL = `https://api.spotify.com/v1/audio-features/${id}`;
  try {
    const result = await get(API_URL);
    return dispatch(setSentiment(id, result.valence, result.danceability));
  } catch (error) {
    console.log('error', error);
  }
};
