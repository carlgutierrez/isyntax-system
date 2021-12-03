import React from 'react';
import { Container, Navbar, Nav, Image } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';
import AuthNav from './AuthNav';
import { useAuth0 } from '@auth0/auth0-react';

const dashboardlinks = [
  {
    label: 'Dashboard',
    link: '/dashboard',
  },
  {
    label: 'Leaderboard',
    link: '/leaderboard',
  },
];

const landingLinks = [
  {
    label: 'About',
    link: '#about',
  },
  {
    label: 'Mission',
    link: '#mission',
  },
  {
    label: 'Contact',
    link: '#contact',
  },
];

const avatar =
  'https://lh3.googleusercontent.com/a-/AOh14GhqrK09oIp3AFwDy1cxcjfFLpNzabyvrvcIvuchMg=s96-c';

const username = 'ronnel';

function NavBar() {
  const { isLoading } = useAuth0();
  const { pathname } = useLocation();
  const links = pathname === '/' ? landingLinks : dashboardlinks;
  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      bg='dark'
      variant='dark'
      className='py-3'
    >
      <Container>
        <Navbar.Brand href='/' className='text-primary'>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <h3>
              <i className='bi bi-code-slash'></i> iSyntax
            </h3>
          </Link>
        </Navbar.Brand>

        {!isLoading && (
          <>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className='ms-auto d-lg-flex align-items-center'>
                {links.map(({ label, link }, index) => (
                  <Nav.Item as='li' key={index} className='mx-3'>
                    {link.charAt(0) === '/' ? (
                      <NavLink
                        to={link}
                        style={{ textDecoration: 'none' }}
                        className='text-muted'
                        activeClassName='selected'
                      >
                        {label}
                      </NavLink>
                    ) : (
                      <Nav.Link href={link}>{label}</Nav.Link>
                    )}
                  </Nav.Item>
                ))}

                {avatar && username && (
                  <Nav.Item as='li'>
                    <Link
                      to={`/profile/${username}`}
                      style={{ textDecoration: 'none' }}
                      className='text-muted'
                    >
                      <Image
                        // referrerpolicy='no-referrer'
                        src={avatar}
                        roundedCircle
                        width='28px'
                        height='28px'
                      />
                    </Link>
                  </Nav.Item>
                )}

                <AuthNav />
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default NavBar;
