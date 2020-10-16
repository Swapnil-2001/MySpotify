import React from 'react';
import { Form, Button } from 'react-bootstrap';

function SearchSimilar(props) {
  const handleSearch = (event) => {
    event.preventDefault();
    props.handleSearch(props.ids);
  };
  return (
    <div className="fav__button">
      <Form onSubmit={handleSearch}>
        <Button variant="outline-secondary" className="similar__button" type="submit">
          Search for similar artists
        </Button>
      </Form>
    </div>
  );
};
export default SearchSimilar;