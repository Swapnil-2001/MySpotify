import React, { Suspense } from 'react';

const TopTracksCards = React.lazy(() => import('./TopTracksCards'));

function TopTracksResult({ artists }) {
  return (
    <React.Fragment>
      {artists.length > 0 && (
        <div className="fav__artists__div">
          {artists.map((artist, index) => {
            const [id, name, image] = artist;
            return (
              <div key={index}>
                <div className="fav__artist">
                  <div style={{ flex: '1' }}>
                    <img className="fav__artist__image" src={image} alt="artist" />
                  </div>
                  <div className="each__artist">
                    By <h1>{name}</h1>
                  </div>
                </div>
                <Suspense fallback={<div></div>}>
                  <TopTracksCards id={id} />
                </Suspense>
              </div>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
}

export default (TopTracksResult);