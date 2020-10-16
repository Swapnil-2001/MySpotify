import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';

function Header({ image, name, dispatch }) {
  const hour = new Date().getHours();
  let greeting = '';
  if (hour > 5 && hour < 12) {
    greeting = 'Good Morning';
  } else if (hour >= 12 && hour < 17) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }
  return (
    <div className="heading-div">
      <Fade left>
        <Link to='/dashboard' style={{ textDecoration: 'none', color: '#578298' }}>
          <h1 className="main-heading">MySpotify</h1>
        </Link>
      </Fade>
      <Fade right>
        {image && <img src={image} alt="user" className="profile__pic" />}
      </Fade>
      <Zoom>
        {name && <h1 className="name">{greeting}, {name}.</h1>}
      </Zoom>
    </div>
  )
}

export default connect()(Header);
