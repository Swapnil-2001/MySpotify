import React from 'react';
import { Form, Button } from 'react-bootstrap';

function SearchFav({ fav }) {
  const handleSearch = event => {
    event.preventDefault();
    fav();
  };
  return (
    <Form onSubmit={handleSearch}>
      <Button variant="info" type="submit">
        Favorite
      </Button>
    </Form>
  );
};

export default SearchFav;
