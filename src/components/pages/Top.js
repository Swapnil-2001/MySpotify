import React, {useState, useEffect} from 'react';
import * as SpotifyFunctions from '../spotifyFunctions.js'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SearchTopTracks from '../search/SearchTopTracks';
import happyMusic from '../../images/happyMusic.jpg';

function Top(props) {
  const { isValidSession, history } = props;
  let result = {};

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [topTracks, setTopTracks] = useState([])
  const [topTracksRecent, setTopTracksRecent] = useState([])
  const [topTracksVeryRecent, setTopTracksVeryRecent] = useState([])
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    async function getTopTracks() {
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
    }
    getTopTracks();
  }, [])

  if (fetched) {
    result = { topTracks, topTracksRecent, topTracksVeryRecent };
  }

  return (
    <div>
      <Link to='/dashboard' style={{ textDecoration: 'none', color: '#778298' }}>
        <div className="fav__songs__cover__text">
          <h1 style={{ fontWeight: '800', fontSize: '2.8rem' }}>Your Favorite Tracks</h1>
        </div>
      </Link>
      <div className='fav__songs__div'>
        <img src={happyMusic} alt="music" className="fav__songs__cover" />
      </div>
      {fetched &&
        <SearchTopTracks
          result={result}
          selectedCategory={selectedCategory}
          setCategory={setSelectedCategory}
        />
      }
    </div>
  )
}

export default connect()(Top);