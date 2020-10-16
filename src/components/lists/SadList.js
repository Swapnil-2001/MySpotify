import React from 'react';
import music from '../../images/music.jpeg';
import Fade from 'react-reveal/Fade';
import _ from 'lodash';

function SadList({ sadSongs }) {
  return (
    <React.Fragment>
      <div className="sad__div">
        <img src="https://i.scdn.co/image/ab67706f000000033c6c5a76712dd683af373183" alt="sad" className="sad" />
      </div>
      {sadSongs.length > 0 && (
        sadSongs.map((song, index) => (
          <div key={index} className='container__div'>
            <Fade bottom>
              <a href={song.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="track-history__item" style={{ textDecoration: 'none' }} >
                <div className="order-number">{index + 1}</div>
                {!_.isEmpty(song.album.images) ?
                  <img className="track-history__image" src={song.album.images[0].url} alt="album"/> :
                    <img src={music} alt="" />
                }
                <div className="track__info">
                  <div className="track__artist">{song.name}</div>
                  <div className="track__track-name">{song.album.artists[0].name}</div>
                </div>
              </a>
            </Fade>
          </div>
        )
      )
    )}
    </React.Fragment>
  );
};
export default SadList;