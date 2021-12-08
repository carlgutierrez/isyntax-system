import React from 'react';
import { Container, Navbar, Nav, Image } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';
import AuthNav from './AuthNav';
import { useAuth0 } from '@auth0/auth0-react';
import { useGlobalContext } from './../context';

const studentLinks = [
  { label: 'Dashboard', link: '/dashboard' },
  { label: 'Leaderboard', link: '/leaderboard' },
];

const teacherLinks = [
  { label: 'Dashboard', link: '/dashboard' },
  { label: 'Students', link: '/students' },
  { label: 'Leaderboard', link: '/leaderboard' },
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

function NavBar() {
  const { userProfile } = useGlobalContext();

  const { isLoading, isAuthenticated } = useAuth0();
  const { pathname } = useLocation();
  const dashboardLinks =
    userProfile.role !== 'student' ? teacherLinks : studentLinks;
  const links = pathname === '/' ? landingLinks : dashboardLinks;
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
          <a href='/' style={{ textDecoration: 'none' }}>
            <h3>
              <i className='bi bi-code-slash'></i> iSyntax
            </h3>
          </a>
        </Navbar.Brand>

        {!isLoading && (
          <>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className='ms-auto d-lg-flex align-items-center'>
                {links.map(({ label, link }, index) => (
                  <Nav.Item as='li' key={index} className='mx-3'>
                    {link.charAt(0) === '/' ? (
                      // <NavLink
                      <a
                        href={link}
                        style={{ textDecoration: 'none' }}
                        className='text-muted'
                        activeClassName='selected'
                      >
                        {label}
                      </a>
                    ) : (
                      <Nav.Link href={link}>{label}</Nav.Link>
                    )}
                  </Nav.Item>
                ))}

                {isAuthenticated && userProfile && (
                  <Nav.Item as='li'>
                    {/* <Link
                      to={`/profile/${userProfile.username}`}
                      style={{ textDecoration: 'none' }}
                    > */}
                    <a href={`/profile/${userProfile.username}`}>
                      <Image
                        // referrerpolicy='no-referrer'
                        src={userProfile.picture}
                        roundedCircle
                        width='28px'
                        height='28px'
                      />
                    </a>
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
