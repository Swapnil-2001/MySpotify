import React, {useState, useEffect, Suspense} from 'react';
import * as SpotifyFunctions from '../spotifyFunctions.js'
import { connect } from 'react-redux';
import perform from '../../images/perform.png';

const TopTracksResult = React.lazy(() => import('../search/TopTracksResult'));

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
        <div style={{ textAlign: 'center', backgroundImage: 'linear-gradient(to right, rgba(47, 50, 51, 0.5), rgba(47, 50, 51, 1))' }}>
          <img src={perform} alt="perform" className="favorite__banner" />
          <Suspense fallback={<div></div>}>
            <TopTracksResult artists={favArtists} />
          </Suspense>
        </div>
      )}
    </div>
  )
}

export default connect()(TopTracks);