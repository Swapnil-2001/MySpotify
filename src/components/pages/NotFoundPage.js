import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';

function NotFoundPage() {
  return (
    <React.Fragment>
      <Header />
      Page not found. Goto <Link to="/dashboard">Home Page</Link>
    </React.Fragment>
  );
};
export default NotFoundPage;