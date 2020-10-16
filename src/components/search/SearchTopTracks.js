import React from 'react';
import _ from 'lodash';
import Fade from 'react-reveal/Fade';

function SearchTopTracks(props) {
  const { result, selectedCategory, setCategory } = props;
  const { topTracks, topTracksRecent, topTracksVeryRecent } = result;
  return (
    <React.Fragment>
      <div className="search-buttons-top">
        {!_.isEmpty(topTracks) && (
          <button
            className={`${selectedCategory === 'all' ? 'btn active' : 'btn'}`}
            onClick={() => setCategory('all')}
          >
            All time
          </button>
        )}
        {!_.isEmpty(topTracksRecent) && (
          <button
            className={`${selectedCategory === 'recent' ? 'btn active' : 'btn'}`}
            onClick={() => setCategory('recent')}
          >
            Last 6 months
          </button>
        )}
        {!_.isEmpty(topTracksVeryRecent) && (
          <button
            className={`${selectedCategory === 'veryRecent' ? 'btn active' : 'btn'}`}
            onClick={() => setCategory('veryRecent')}
          >
            Last month
          </button>
        )}
      </div>
      <div className={`${selectedCategory === 'all' ? '' : 'hide'}`}>
        {topTracks && topTracks.map((track, index) => (
          <div key={index} className='container__div'>
            <Fade bottom>
              <a href={track.album.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="track-history__item" style={{ textDecoration: 'none' }} >
                <div className="order-number">{index + 1}</div>
                <img className="track-history__image" src={track.album.images[0].url} alt="album"/>
                <div className="track__info">
                  <div className="track__artist">{track.name}</div>
                  <div className="track__track-name">{track.album.artists[0].name}</div>
                </div>
              </a>
            </Fade>
          </div>
         )
       )}
      </div>
      <div className={`${selectedCategory === 'recent' ? '' : 'hide'}`}>
        {topTracksRecent && topTracksRecent.map((track, index) => (
          <div className='container__div'>
            <Fade bottom>
              <a href={track.album.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="track-history__item" style={{ textDecoration: 'none' }} >
                <div className="order-number">{index + 1}</div>
                <img className="track-history__image" src={track.album.images[0].url} alt="album"/>
                <div className="track__info">
                  <div className="track__artist">{track.name}</div>
                  <div className="track__track-name">{track.album.artists[0].name}</div>
                </div>
              </a>
            </Fade>
          </div>
         )
       )}
      </div>
      <div className={`${selectedCategory === 'veryRecent' ? '' : 'hide'}`}>
        {topTracksVeryRecent && topTracksVeryRecent.map((track, index) => (
          <div className='container__div'>
            <Fade bottom>
              <a href={track.album.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="track-history__item" style={{ textDecoration: 'none' }} >
                <div className="order-number">{index + 1}</div>
                <img className="track-history__image" src={track.album.images[0].url} alt="album"/>
                <div className="track__info">
                  <div className="track__artist">{track.name}</div>
                  <div className="track__track-name">{track.album.artists[0].name}</div>
                </div>
              </a>
            </Fade>
          </div>
         )
       )}
      </div>
    </React.Fragment>
  );
};
export default SearchTopTracks;