import React, { useState, useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import SentimentAnalyzer from '../sentiment/SentimentAnalyzer';
import banner from '../../images/MySpotify-banner.png';
import HappySongs from '../songs/HappySongs';
import DanceSongs from '../songs/DanceSongs';
import SadSongs from '../songs/SadSongs';
import ModerateSongs from '../songs/ModerateSongs';
import * as SpotifyFunctions from '../spotifyFunctions.js'
import Menu from '../Menu';
import spotify from '../../images/spotify.png';
import mood from '../../images/mood.png';

const SearchResultLast = React.lazy(() => import('../search/SearchResultLast'));

function Dashboard(props) {
  const hour = new Date().getHours();
  let greeting = '';
  if (hour > 5 && hour < 12) {
    greeting = 'Good Morning';
  } else if (hour >= 12 && hour < 17) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }
  const { isValidSession, history } = props;
  let h = {};
  let currentFetch = false;
  const [toggle, setToggle] = useState(false);
  const [latest, setLatest] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('happy');
  const [user, setUser] = useState({ imageUrl: '', name: '' });

  useEffect(() => {
    async function load() {
      if (isValidSession()) {
        const params = JSON.parse(localStorage.getItem('params'));
        await SpotifyFunctions.setAccessToken(params.access_token);
        const lastSongs = await SpotifyFunctions.getLatestSongs();
        const res = await SpotifyFunctions.getProfilePic();
        setLatest(lastSongs);
        setUser(prev => {
          return {
            image: res.images.length > 0 ? res.images[0].url : '',
            name: res.display_name
          }
        });
      } else {
        history.push({
          pathname: '/',
          state: {
            session_expired: true
          }
        });
      }
    }
    load();
  }, [])

  function handleMouseDown(event) {
    setToggle(!toggle);
    event.stopPropagation();
  }

  const { sentiment, happySongs, danceSongs, sadSongs, moderateSongs, fetched } = props;
  const result = { happySongs, danceSongs, sadSongs, moderateSongs };

  return (
    <React.Fragment>
      <div className="banner__div">
        <img src={banner} alt="banner" className="banner" />
        {user.name && (
          <div style={{ textAlign: 'center' }}>
            <h1 className="greeting">{greeting}, {user.name}</h1>
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
        {latest !== null && Object.keys(latest).length > 0 &&
          latest.items.map((item, index) =>
            <SentimentAnalyzer key={index} id={item.track.id} />
          )
        }
        {latest !== null && Object.keys(latest).length > 0 && sentiment.length === latest.items.length && !fetched && sentiment.map((item, index) => {
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
        {fetched || currentFetch ? (
          <Suspense fallback={<div></div>}>
            <SearchResultLast
              result={result}
              selectedCategory={selectedCategory}
              setCategory={setSelectedCategory}
            />
          </Suspense>
        ) : <div></div>}
      </div>
    </React.Fragment>
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