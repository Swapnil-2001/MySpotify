import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../components/pages/Home';
import RedirectPage from '../components/pages/RedirectPage';
import Dashboard from '../components/pages/Dashboard';
import TopTracks from '../components/pages/TopTracks';
import Top from '../components/pages/Top';
import NotFoundPage from '../components/pages/NotFoundPage';
import Similar from '../components/pages/Similar';

function AppRouter() {
  const [expiry, setExpiryTime] = useState('0');
  useEffect(() => {
    let expiryTime;
    try {
      expiryTime = JSON.parse(localStorage.getItem('expiry_time'));
    } catch (error) {
      expiryTime = '0';
    }
    setExpiryTime(expiryTime);
  }, [])
  
  const isValidSession = () => {
    const currentTime = new Date().getTime();
    const expiryTime = expiry;
    const isSessionValid = currentTime < expiryTime;
    return isSessionValid;
  };
  return (
    <Router>
      <div className="main">
        <Switch>
          <Route
            exact path="/"
            render={(props) => (
              <Home isValidSession={isValidSession} {...props} />
            )}
          />
          <Route
            path="/redirect"
            render={props => (
              <RedirectPage
                isValidSession={isValidSession}
                setExpiryTime={setExpiryTime}
                {...props}
              />
            )}
          />
          <Route
            exact path="/dashboard/toptracks"
            render={(props) => (
              <Top isValidSession={isValidSession} {...props} />
            )}
          />
          <Route
            exact path="/dashboard/fav"
            render={(props) => (
              <Similar isValidSession={isValidSession} {...props} />
            )}
          />
          <Route
            exact path="/dashboard/top"
            render={(props) => (
              <TopTracks isValidSession={isValidSession} {...props} />
            )}
          />
          <Route
            exact path="/dashboard"
            render={(props) => (
              <Dashboard isValidSession={isValidSession} {...props} />
            )}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default AppRouter;