import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import loginImage from '../../images/login.png';

function Home(props) {
  const {
    REACT_APP_CLIENT_ID,
    REACT_APP_AUTHORIZE_URL
  } = process.env;
  const scopes = [
    "user-top-read",
    "user-read-recently-played",
    "user-read-private"
  ]
  const scope = encodeURIComponent(scopes.join(' '));
  function handleLogin() {
    window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${window.location.origin}/redirect&scope=${scope}&response_type=token&show_dialog=true`;
  }
  const { isValidSession, location } = props;
  const { state } = location;
  const sessionExpired = state && state.session_expired;
  return (
    <>
      {isValidSession() ? (
        <Redirect to="/dashboard" />
      ) : (
        <div className="login">
          {sessionExpired && (
            <Alert variant="info">Session expired. Please login again.</Alert>
          )}
          <div className="login__header__div">
            <img src={loginImage} alt="login" className="login__image" />
            <h1>Revisit your favorites, meet new artists.</h1>
          </div>
          <div style={{ fontSize: '1.2rem', color: '#00587a', fontWeight: '700', padding: '40px', textAlign: 'center' }}>
             Whether you're in the mood to dance, take a trip down the memory lane, or shed a tear or two, there's always a song for you.
          </div>
          <Button variant="outline-secondary" type="submit" onClick={handleLogin}>
            Login with Spotify
          </Button>
        </div>
      )}
    </>
  );
}

export default connect()(Home);
