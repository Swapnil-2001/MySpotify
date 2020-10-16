import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Header from '../Header';
import { Redirect } from 'react-router-dom';

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
    <React.Fragment>
      {isValidSession() ? (
        <Redirect to="/dashboard" />
      ) : (
        <div className="login">
          <Header />
          {sessionExpired && (
            <Alert variant="info">Session expired. Please login again.</Alert>
          )}
          <Button variant="outline-secondary" type="submit" onClick={handleLogin} style={{ fontWeight: '700' }}>
            Login with Spotify
          </Button>
          <div style={{ fontSize: '1.2rem', color: '#00587a', fontWeight: '700', padding: '40px', textAlign: 'center' }}>
            Revisit your favorites, meet new artists. Whether you're in the mood to dance, take a trip down the memory lane, or shed a tear or two, there's always a song for you.
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default connect()(Home);