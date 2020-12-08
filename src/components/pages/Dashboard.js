import React, { useState, useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import * as SpotifyFunctions from '../spotifyFunctions.js'
import { getHappySongs, getDanceSongs, getModerateSongs, getSadSongs, getSentiment } from '../../actions/results';
import Menu from '../Menu';
import banner from '../../images/MySpotify-banner.png';
import spotify from '../../images/spotify.png';
import mood from '../../images/mood.png';
import { css } from "@emotion/core";
import ScaleLoader from "react-spinners/ScaleLoader";
const SearchResultLast = React.lazy(() => import('../search/SearchResultLast'));

function Dashboard(props) {
  const override = css`
    padding: 20px;
  `;
  const hour = new Date().getHours();
  let greeting = hour > 5 && hour < 12 ? 'Good Morning' : hour >= 12 && hour < 17 ? 'Good Afternoon' : 'Good Evening';
  const { isValidSession, history, dispatch, sentiment, fetched } = props;
  const [currentFetch, setCurrentFetch] = useState(false);
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
        setLatest(lastSongs);
        const profile = await SpotifyFunctions.getProfilePic();
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

  useEffect(() => {
    Object.keys(latest).length > 0 &&
      latest.items.forEach(item => dispatch(getSentiment(item.track.id)))
  }, [latest, dispatch])

  useEffect(() => {
    let h = {};
    Object.keys(latest).length > 0
      && sentiment.length === latest.items.length
      && !fetched && sentiment.forEach((item, index) => {
        if (index === latest.items.length - 1) setCurrentFetch(true)
        const [id, score, danceability] = item;
        if (!(id in h)) {
          h[id] = true;
          if (score >= 0.7)  dispatch(getHappySongs(id))
          else if (score >= 0.4 && score < 0.7) dispatch(getModerateSongs(id))
          else dispatch(getSadSongs(id))
          if (danceability > 0.7)  dispatch(getDanceSongs(id))
        }
      }
    )
  }, [sentiment, latest, dispatch, fetched])

  const handleMouseDown = event => {
    setToggle(!toggle);
    event.stopPropagation();
  }

  const { happySongs, sadSongs, moderateSongs, danceSongs } = props;
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
      {(currentFetch || fetched) ? (
        <Suspense fallback={<div></div>}>
          <SearchResultLast
            result={result}
            selectedCategory={selectedCategory}
            setCategory={setSelectedCategory}
          />
        </Suspense>
      ) :
        <div style={{ height: '100px', backgroundColor: '#fae0df', textAlign: 'center' }}>
          <ScaleLoader
            css={override}
            height={35}
            width={4}
            radius={2}
            color={"#a6a6a4"}
            loading={!(currentFetch || fetched)}
          />
        </div>
      }
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
