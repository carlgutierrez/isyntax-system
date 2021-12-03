import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavBar from './../components/NavBar';

const links = [
  {
    label: 'Dashboard',
    link: '/dashboard',
  },
  {
    label: 'Leaderboard',
    link: '/leaderboard',
  },
];

function NotFound(props) {
  return (
    <Container>
      <NavBar
        links={links}
        btnLabel='Logout'
        avatar='https://lh3.googleusercontent.com/a-/AOh14GhqrK09oIp3AFwDy1cxcjfFLpNzabyvrvcIvuchMg=s96-c'
        username='ronnel'
        isDropdown={true}
      />
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
