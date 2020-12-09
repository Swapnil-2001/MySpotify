import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Fade from 'react-reveal/Fade';
import music from '../../images/music.jpeg';

function SearchSimilarResult({ known, related, setLoading }) {
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    if (artists.length === 0) {
      let h = {};
      Object.keys(known).forEach(id => {
        h[id] = true;
      })
      related.forEach(artist => {
        if (!(artist.id in h)) {
          h[artist.id] = true;
          setArtists(prev => [...prev, artist]);
        }
      })
      setLoading(false);
    }
  }, [setLoading, artists.length, known, related])
  return (
    <>
      {artists.length > 0 &&
        artists.map((artist, index) => (
          <div key={index} className='container__div'>
            <Fade bottom>
              <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="track-history__item" style={{ textDecoration: 'none' }} >
                <div className="order-number">{index + 1}</div>
                {!_.isEmpty(artist.images) ?
                  <img className="track-history__image" src={artist.images[0].url} alt="album"/> :
                    <img src={music} alt="albumImg" />
                }
                <div className="track__info">
                  <div className="track__artist">{artist.name}</div>
                </div>
              </a>
            </Fade>
          </div>
        ))
      }
    </>
  );
}

export default connect()(SearchSimilarResult);
