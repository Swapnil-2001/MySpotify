import React from 'react';
import { Form, Button } from 'react-bootstrap';

function SearchFav(props) {
  const handleSearch = (event) => {
    event.preventDefault();
    props.fav();
  };
  return (
    <div>
      <Form onSubmit={handleSearch}>
        <Button variant="info" type="submit">
          Favorite
        </Button>
      </Form>
    </div>
  );
};
export default SearchFav;