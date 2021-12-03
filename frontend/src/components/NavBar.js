import React from 'react';
import {
  Container,
  Navbar,
  Nav,
  Button,
  NavDropdown,
  Image,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsCodeSlash } from 'react-icons/bs';

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

function NavBar({ links, btnLabel, avatar, username, isDropdown }) {
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
          {/* <BsCodeSlash /> iSyntax */}
          <Link to='/' style={{ textDecoration: 'none' }}>
            <h3>
              <i className='bi bi-code-slash'></i> iSyntax
            </h3>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          {/* <Nav as='ul' className='ms-auto d-lg-flex align-items-center'> */}
          <Nav className='ms-auto d-lg-flex align-items-center'>
            {links.map(({ label, link }, index) => (
              <Nav.Item as='li' key={index} className='mx-3'>
                {link.charAt(0) === '/' ? (
                  <Link
                    to={link}
                    style={{ textDecoration: 'none' }}
                    className='text-muted'
                  >
                    {label}
                  </Link>
                ) : (
                  <Nav.Link href={link}>{label}</Nav.Link>
                )}
              </Nav.Item>
            ))}

            {isDropdown ? (
              <NavDropdown id='basic-nav-dropdown'>
                <NavDropdown.Item href='/'>{btnLabel}</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Item as='li'>
                <Link to='/dashboard'>
                  <Button variant='outline-primary' className='px-4 mx-3'>
                    {btnLabel}
                  </Button>
                </Link>
              </Nav.Item>
            )}

            {avatar && username && (
              <Nav.Item as='li'>
                <Link
                  to={`/profile/${username}`}
                  style={{ textDecoration: 'none' }}
                  className='text-muted'
                >
                  {capitalizeFirstLetter(username)} &nbsp;&nbsp;&nbsp;
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

            {/* <Nav.Item as='li'>
              <Button variant='outline-primary' className='px-4 mx-3'>
                {btnLabel}
              </Button>
            </Nav.Item> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
