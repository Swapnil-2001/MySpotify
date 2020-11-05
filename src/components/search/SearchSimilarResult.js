import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Fade from 'react-reveal/Fade';
import music from '../../images/music.jpeg';

function SearchSimilarResult(props) {
  const { known, related } = props;
  let h = {};
  Object.keys(known).forEach(id => {
    h[id] = true;
  })
  let artists = [];
  related.forEach(artist => {
    if (!(artist.id in h)) {
      h[artist.id] = true;
      artists.push(artist);
    }
  })
  return (
    <React.Fragment>
      {artists.length > 0 && (
          artists.map((artist, index) => {
            return (
              <div key={index} className='container__div'>
                <Fade bottom>
                  <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="track-history__item" style={{ textDecoration: 'none' }} >
                    <div className="order-number">{index + 1}</div>
                    {!_.isEmpty(artist.images) ?
                      <img className="track-history__image" src={artist.images[0].url} alt="album"/> :
                        <img src={music} alt="" />
                    }
                    <div className="track__info">
                      <div className="track__artist">{artist.name}</div>
                    </div>
                  </a>
                </Fade>
              </div>
            )
          })
      )}
    </React.Fragment>
  );
}

export default connect()(SearchSimilarResult);
