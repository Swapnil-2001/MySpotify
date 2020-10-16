import React, {useState, useEffect} from 'react';
import * as SpotifyFunctions from '../spotifyFunctions.js'
import { connect } from 'react-redux';
import TopTracksResult from '../search/TopTracksResult';

function TopTracks(props) {
  const { isValidSession, history } = props;
  const [favArtists, setFavArtists] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    async function getTopArtists() {
      if (isValidSession()) {
        const params = JSON.parse(localStorage.getItem('params'));
        await SpotifyFunctions.setAccessToken(params.access_token);
        const artists = await SpotifyFunctions.getFavArtists();
        artists.items.forEach(artist => {
          const { id, name, images } = artist;
          const url = images[0].url;
          setFavArtists(prev => {
            return [
              ...prev,
              [id, name, url]
            ]
          })
        })
        setFetched(true)
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

  return (
    <div>
      {fetched && (
        <div style={{ textAlign: 'center', padding: '0 40px' }}>
          <h1 className="top__tracks__text">Sit back and enjoy some of the best tracks by your favorite artists.</h1>
          <TopTracksResult artists={favArtists} />
        </div>
      )}
    </div>
  )
}

export default connect()(TopTracks);