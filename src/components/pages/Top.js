import React, {useState, useEffect, Suspense} from 'react';
import * as SpotifyFunctions from '../spotifyFunctions.js'
import { connect } from 'react-redux';
import fav from '../../images/favorite.png';

const SearchTopTracks = React.lazy(() => import('../search/SearchTopTracks'));

function Top(props) {
  const { isValidSession, history } = props;
  let result = {};

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [topTracks, setTopTracks] = useState([])
  const [topTracksRecent, setTopTracksRecent] = useState([])
  const [topTracksVeryRecent, setTopTracksVeryRecent] = useState([])
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    (async function() {
      if (isValidSession()) {
        const params = JSON.parse(localStorage.getItem('params'));
        await SpotifyFunctions.setAccessToken(params.access_token);
        const tracks = await SpotifyFunctions.getUserTopTracks('long_term');
        tracks.items.forEach(item => {
          setTopTracks(prev => [...prev, item])
        })
        const tracksRecent = await SpotifyFunctions.getUserTopTracks('medium_term');
        tracksRecent.items.forEach(item => {
          setTopTracksRecent(prev => [...prev, item])
        })
        const tracksVeryRecent = await SpotifyFunctions.getUserTopTracks('short_term');
        tracksVeryRecent.items.forEach(item => {
          setTopTracksVeryRecent(prev => [...prev, item])
        })
        setFetched(true);
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

  if (fetched) {
    result = { topTracks, topTracksRecent, topTracksVeryRecent };
  }

  return (
    <>
      <div className='fav__songs__div'>
        <img src={fav} alt="music" className="fav__songs__cover" />
      </div>
      {fetched &&
        <Suspense fallback={<div></div>}>
          <SearchTopTracks
            result={result}
            selectedCategory={selectedCategory}
            setCategory={setSelectedCategory}
          />
        </Suspense>
      }
    </>
  )
}

export default connect()(Top);
