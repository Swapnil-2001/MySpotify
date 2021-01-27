import React, {useState, useEffect, Suspense} from 'react';
import * as SpotifyFunctions from '../spotifyFunctions.js';
import { connect } from 'react-redux';
import { getRelatedArtists, setFetchedSimilar } from '../../actions/results';
import SearchSimilar from '../search/SearchSimilar';
import { css } from "@emotion/core";
import ScaleLoader from "react-spinners/ScaleLoader";
const SearchSimilarResult = React.lazy(() => import('../search/SearchSimilarResult'));

function Similar(props) {
  const override = css`
    padding: 20px;
  `;
  const { isValidSession, history, dispatch } = props;
  const [favArtists, setFavArtists] = useState([]);
  const [known, setKnown] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function() {
      if (isValidSession()) {
        const params = JSON.parse(localStorage.getItem('params'));
        await SpotifyFunctions.setAccessToken(params.access_token);
        const favArtists = await SpotifyFunctions.getFavArtists();
        favArtists.items.forEach(artist => {
          const { id } = artist;
          setKnown(prev => (
            {
              ...prev,
              [id]: true
            }
          ))
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
    })();
  }, [history, isValidSession])

  const handleSearch = ids => {
    if (isValidSession()) {
      setLoading(true);
      ids && ids.forEach(id => {
        dispatch(getRelatedArtists(id));
      })
      dispatch(setFetchedSimilar());
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
      {favArtists.length > 1 && (
        <div className="fav__text">
          Yes, all of us love {favArtists[0].name}. And {favArtists[1].name}? The best. But here are a few other artists you're going to love.
        </div>
      )}
      {!fetchedSimilar && <SearchSimilar handleSearch={handleSearch} ids={ids} />}
      {loading && (
        <div style={{ height: '100px', textAlign: 'center' }}>
          <ScaleLoader
            css={override}
            height={35}
            width={4}
            radius={2}
            color={"white"}
            loading={true}
          />
        </div>
      )}
      {related.length === 60 && fetchedSimilar && (
        <Suspense fallback={<div></div>}>
          <SearchSimilarResult setLoading={setLoading} known={known} related={related} />
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
