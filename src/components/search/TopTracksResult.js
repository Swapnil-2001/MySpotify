import React from 'react';
import TopTracksCards from './TopTracksCards';

function TopTracksResult({ artists }) {
  return (
    <React.Fragment>
      {artists.length > 0 && (
        <div className="fav__artists__div">
          {artists.map((artist, index) => {
            const [id, name, image] = artist;
            return (
              <div style={{ marginBottom: '30px' }}>
                <div className="each__artist">
                  <h1 style={{ fontWeight: '700' }}>By {name}</h1>
                </div>
                <TopTracksCards id={id} image={image} />
              </div>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
}

export default (TopTracksResult);