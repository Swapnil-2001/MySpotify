import React from 'react';
import { Form, Button } from 'react-bootstrap';
import similar from '../../images/similar.jpg';

function SearchSimilar({ handleSearch, ids }) {
  const handleClick = (event) => {
    event.preventDefault();
    handleSearch(ids);
  };
  return (
    <div className="fav__button">
      <div style={{ flex: '1', marginBottom: '50px' }}>
        <img src={similar} alt="similar" className="similar__img" />
      </div>
      <Form style={{ flex: '1' }} onSubmit={handleClick}>
        <Button variant="outline-secondary" className="similar__button" type="submit">
          Search for similar artists
        </Button>
      </Form>
    </div>
  );
};
export default SearchSimilar;
