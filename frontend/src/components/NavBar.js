import React from 'react';
import { Container, Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsCodeSlash } from 'react-icons/bs';
import { Image } from 'react-bootstrap';

function NavBar({ links, btnLabel, avatar, isDropdown }) {
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
          {/* <Nav></Nav> */}
          <Nav as='ul' className='ms-auto d-lg-flex align-items-center'>
            {links.map(({ label, link }, index) => (
              <Nav.Item as='li' key={index} className='mx-3'>
                <Nav.Link href={link}>{label}</Nav.Link>
              </Nav.Item>
            ))}

            {isDropdown ? (
              <NavDropdown title='' id='basic-nav-dropdown'>
                <NavDropdown.Item href='#action/3.1'>
                  {btnLabel}
                </NavDropdown.Item>
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

            {avatar && (
              <Nav.Item as='li'>
                <Nav.Link href='/profile'>
                  Ronnel &nbsp;&nbsp;&nbsp;
                  <Image
                    src={avatar}
                    roundedCircle
                    width='28px'
                    height='28px'
                  />
                </Nav.Link>
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
