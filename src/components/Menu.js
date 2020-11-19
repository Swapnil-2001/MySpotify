import React from 'react';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';
import spotify from '../images/spotifyLogo.png';

function Menu({ dispatch, menuVisibility, handleMouseDown }) {
  let visibility = 'hide';
  if (menuVisibility) {
    visibility = 'show';
  }

  return (
    <Fade left>
      <div id="flyoutMenu" className={visibility}>
        <div style={{ textAlign: 'center' }}>
          <img src={spotify} alt="hamburger" className="hamburger menu__hamburger" onMouseDown={handleMouseDown} />
        </div>
        <div className="menu__div">
          <Link to='/dashboard/fav' className="menu__links" style={{ textDecoration: 'none' }}>Get artists similar to the ones you love</Link>
        </div>
        <div className="menu__div">
          <Link to='/dashboard/top' className="menu__links" style={{ textDecoration: 'none' }}>Get top tracks by your favorite artists</Link>
        </div>
        <div className="menu__div">
          <Link to='/dashboard/toptracks' className="menu__links" style={{ textDecoration: 'none' }}>Listen to your favorite tracks</Link>
        </div>
      </div>
    </Fade>
  )
}

export default connect()(Menu);
