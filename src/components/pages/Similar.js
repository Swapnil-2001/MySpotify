import React, {useState, useEffect, Suspense} from 'react';
import { getRelatedArtists, setFetchedSimilar } from '../../actions/results';
import * as SpotifyFunctions from '../spotifyFunctions.js'
import { connect } from 'react-redux';
import SearchSimilar from '../search/SearchSimilar';

const SearchSimilarResult = React.lazy(() => import('../search/SearchSimilarResult'));

function Similar(props) {
  const { isValidSession, history } = props;
  const imageUrl = '';
  const [favArtists, setFavArtists] = useState([]);
  const [known, setKnown] = useState({});

  useEffect(() => {
    async function getTopArtists() {
      if (isValidSession()) {
        const params = JSON.parse(localStorage.getItem('params'));
        await SpotifyFunctions.setAccessToken(params.access_token);
        const favArtists = await SpotifyFunctions.getFavArtists();
        favArtists.items.forEach(artist => {
          const { id } = artist;
          setKnown(prev => {
            return {
              ...prev,
              [id]: true
            }
          })
        })
        const artists = favArtists.items.slice(0, 2);
        setFavArtists(artists);
      } else {
        history.push({
          pathname: '/',
          state: {
            session_expired: true
          }
        });
      }
    }
    getTopArtists();
  }, [])

  function handleSearch(ids) {
    if (isValidSession()) {
      ids && ids.forEach(id => {
        props.dispatch(getRelatedArtists(id)).then(() => {})
      })
      props.dispatch(setFetchedSimilar());
    } else {
      history.push({
      pathname: '/',
      state: {
        session_expired: true
        }
      });
    }
  }

  const { related, fetchedSimilar } = props;
  let ids = Object.keys(known).slice(0, 3);

  return (
    <div
      style={{ minHeight: '100vh', backgroundImage: 'linear-gradient(to right, rgba(89, 91, 131,1), rgba(89, 91, 131,0.8))' }}
    >
      {favArtists.length > 1 ? (
        <div className="fav__text">
          Yes, all of us love {favArtists[0].name}. And {favArtists[1].name}? The best. But here are a few other artists you're going to love.
        </div>) :
        <div></div>
      }
      {!fetchedSimilar && <SearchSimilar handleSearch={handleSearch} ids={ids} />}
      { related.length === 60 && fetchedSimilar && (
        <Suspense fallback={<div></div>}>
          <SearchSimilarResult known={known} related={related} />
        </Suspense>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    related: state.similar,
    fetchedSimilar: state.fetchedSimilar,
  };
};

export default connect(mapStateToProps)(Similar);