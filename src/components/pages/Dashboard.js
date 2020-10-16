import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import SentimentAnalyzer from '../sentiment/SentimentAnalyzer';
import HappySongs from '../songs/HappySongs';
import DanceSongs from '../songs/DanceSongs';
import SadSongs from '../songs/SadSongs';
import ModerateSongs from '../songs/ModerateSongs';
import SearchResultLast from '../search/SearchResultLast';
import * as SpotifyFunctions from '../spotifyFunctions.js'
import Menu from '../Menu';
import spotify from '../../images/spotify.png';

function Dashboard(props) {
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
      <div>
        <Header image={user.image} name={user.name} />
        <div className="dashboard__intro">
          <div>
            The latest songs you've listened to, filtered by mood.
          </div>
          <div>
            Click on the button to explore more.
          </div>
        </div>
        <div  style={{ textAlign: 'center' }}>
          <img src={spotify} alt="hamburger" onMouseDown={handleMouseDown} className="hamburger" />
        </div>
        <Menu
          handleMouseDown={handleMouseDown}
          menuVisibility={toggle}
        />
        {Object.keys(latest).length > 0 &&
          latest.items.map((item, index) =>
            <SentimentAnalyzer key={index} id={item.track.id} />
          )
        }
        {Object.keys(latest).length > 0 && sentiment.length === latest.items.length && !fetched && sentiment.map((item, index) => {
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
        {fetched || currentFetch ? <SearchResultLast
          result={result}
          selectedCategory={selectedCategory}
          setCategory={setSelectedCategory}
        /> : <div></div>}
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