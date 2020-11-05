import React from 'react';
import music from '../../images/music.jpeg';
import Fade from 'react-reveal/Fade';
import _ from 'lodash';

function HappyList({ happySongs }) {
  return (
    <React.Fragment>
      <div className="happy__div">
        <img src="https://i.scdn.co/image/ab67706f00000003aa93fe4e8c2d24fc62556cba" alt="happy" className="mood-booster" />
      </div>
      {happySongs.length > 0 && (
        happySongs.map((song, index) => (
          <div key={index} style={{ backgroundColor: '#495464' }}>
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
                    <div className="track__track-name">{song.album.artists[0].name}</div>
                  </div>
                </a>
              </Fade>
            </div>
          </div>
         )
       )
      )}
    </React.Fragment>
  );
};
export default HappyList;
