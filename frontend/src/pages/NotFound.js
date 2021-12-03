import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFound(props) {
  return (
    <Container>
      <div className='text-center mx-auto text-white mt-4 pt-4'>
        <h1>Page Not Found</h1>
        <p>
          Looks like you've followed a broken link or entered a URL that doesn't
          exist on this site.
        </p>
        <Button variant='primary'>
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
            <i class='bi bi-arrow-left-short'></i>Back to our site
          </Link>
        </Button>
      </div>
    </Container>
  );
}

export default NotFound;
