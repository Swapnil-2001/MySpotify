import React, { useState, useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import * as SpotifyFunctions from '../spotifyFunctions.js'
import SentimentAnalyzer from '../sentiment/SentimentAnalyzer';
import HappySongs from '../songs/HappySongs';
import DanceSongs from '../songs/DanceSongs';
import SadSongs from '../songs/SadSongs';
import ModerateSongs from '../songs/ModerateSongs';
import Menu from '../Menu';
import banner from '../../images/MySpotify-banner.png';
import spotify from '../../images/spotify.png';
import mood from '../../images/mood.png';
const SearchResultLast = React.lazy(() => import('../search/SearchResultLast'));

function Dashboard(props) {
  const hour = new Date().getHours();
  let greeting = hour > 5 && hour < 12 ? 'Good Morning' : hour >= 12 && hour < 17 ? 'Good Afternoon' : 'Good Evening';
  const { isValidSession, history } = props;
  let h = {}, currentFetch = false;
  const [toggle, setToggle] = useState(false);
  const [latest, setLatest] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('happy');
  const [user, setUser] = useState('');

  useEffect(() => {
    (async function() {
      if (isValidSession()) {
        const params = JSON.parse(localStorage.getItem('params'));
        await SpotifyFunctions.setAccessToken(params.access_token);
        const lastSongs = await SpotifyFunctions.getLatestSongs();
        const profile = await SpotifyFunctions.getProfilePic();
        setLatest(lastSongs);
        setUser(profile.display_name);
      } else {
        history.push({
          pathname: '/',
          state: {
            session_expired: true
          }
        });
      }
    })();
  }, [history, isValidSession])

  function handleMouseDown(event) {
    setToggle(!toggle);
    event.stopPropagation();
  }

  const { sentiment, happySongs, danceSongs, sadSongs, moderateSongs, fetched } = props;
  const result = { happySongs, danceSongs, sadSongs, moderateSongs };

  return (
    <>
      <div className="banner__div">
        <img src={banner} alt="banner" className="banner" />
        {user && (
          <div style={{ textAlign: 'center' }}>
            <h1 className="greeting">{greeting}, {user}</h1>
          </div>
        )}
      </div>
      <div>
        <div className="dashboard__banner">
          <div className="dashboard__intro">
            <div>
              The latest songs you've listened to, filtered by mood.
            </div>
            <div>
              <img src={mood} alt="mood" className="dashboard__image" />
            </div>
          </div>
          <div style={{ textAlign: 'center', margin: '0 30px', color: '#2d6187' }}>
            Click on the button to explore more.
          </div>
          <div style={{ textAlign: 'center', marginTop: '30px', marginBottom: '40px' }}>
            <img src={spotify} alt="hamburger" onMouseDown={handleMouseDown} className="hamburger" />
          </div>
          <Menu
            handleMouseDown={handleMouseDown}
            menuVisibility={toggle}
          />
        </div>
        {Object.keys(latest).length > 0 &&
          latest.items.map((item, index) =>
            <SentimentAnalyzer key={index} id={item.track.id} />
          )
        }
        {Object.keys(latest).length > 0
          && sentiment.length === latest.items.length
          && !fetched && sentiment.map((item, index) => {
              if (index === latest.items.length - 1) {
                currentFetch = true;
              }
              const [id, score, danceability] = item;
              if (id in h) {
                return null;
              } else {
                h[id] = true;
                if (score >= 0.7) {
                  return (
                    danceability > 0.7 ? <div key={index}>
                      <HappySongs id={id} />
                      <DanceSongs id={id} />
                    </div> : <HappySongs key={index} id={id} />
                  )
                } else if (score >= 0.4 && score < 0.7) {
                  return (
                    danceability > 0.7 ? <div key={index}>
                      <ModerateSongs id={id} />
                      <DanceSongs id={id} />
                    </div> : <ModerateSongs key={index} id={id} />
                  )
                } else if (score < 0.4){
                  return (
                    danceability > 0.7 ? <div key={index}>
                      <SadSongs id={id} />
                      <DanceSongs id={id} />
                    </div> : <SadSongs key={index} id={id} />
                  )
                }
              }
            }
          )
        }
        {currentFetch || fetched ? (
          <Suspense fallback={<div></div>}>
            <SearchResultLast
              result={result}
              selectedCategory={selectedCategory}
              setCategory={setSelectedCategory}
            />
          </Suspense>
        ) : <div></div>}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    sentiment: state.sentiment,
    happySongs: state.happySongs,
    danceSongs: state.danceSongs,
    moderateSongs: state.moderateSongs,
    sadSongs: state.sadSongs,
    fetched: state.fetched
  };
};

export default connect(mapStateToProps)(Dashboard);
