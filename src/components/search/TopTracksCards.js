import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Fade from 'react-reveal/Fade';
import music from '../../images/music.jpeg';
import * as SpotifyFunctions from '../spotifyFunctions.js'

function TopTracksCards({ id, image }) {
  const [topTracks, setTracks] = useState([])
  const [received, setReceived] = useState(false);
  useEffect(() => {
    async function getTracks() {
      const params = JSON.parse(localStorage.getItem('params'));
      await SpotifyFunctions.setAccessToken(params.access_token);
      const res = await SpotifyFunctions.getTopTracks(id);
      setTracks(res.tracks);
      setReceived(true);
    }
    getTracks();
  }, [id]);
  let tracks = [];
  if (received) {
    tracks = topTracks.length > 9 ? topTracks.slice(0, 10) : topTracks;
  }
  return (
    <React.Fragment>
      {received && (
        <div>
          <img src={image} alt="happy" className="artist" />
          {tracks.map((song, index) => {
            return (
              <div className='container__div'>
                <Fade bottom>
                  <a href={song.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="track-history__item" style={{ textDecoration: 'none' }} >
                    <div className="order-number">{index + 1}</div>
                    {!_.isEmpty(song.album.images) ?
                      <img className="track-history__image" src={song.album.images[0].url} alt="album"/> :
                        <img src={music} alt="" />
                    }
                    <div className="track__info">
                      <div className="track__artist">{song.name}</div>
                    </div>
                  </a>
                </Fade>
              </div>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
}

export default (TopTracksCards);
