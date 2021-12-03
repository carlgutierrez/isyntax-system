import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function UserSection({ username, name, email, picture }) {
  return (
    <div className='col-md-7 col-lg-4 mb-5 mb-lg-0 wow fadeIn'>
      <div className='bg-dark card border-10 shadow'>
        <Image
          roundedCircle
          width='300px'
          height='300px'
          className='rounded mx-auto mt-3 '
          src={picture}
        />
        <div className='card-body p-1-9 p-xl-5'>
          <div className='mb-4'>
            <h3 className='h4 mb-0 text-center text-white'>{name}</h3>
          </div>
          <ul className='list-unstyled mb-4 text-center'>
            <li className='mb-3'>
              <Link
                to='#'
                onClick={e => {
                  window.location = `mailto:${email}`;
                  e.preventDefault();
                }}
                className='text-muted'
                style={{ textDecoration: 'none' }}
              >
                <i className='bi bi-envelope display-25 me-3 text-secondary'></i>
                <br />
                {email}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserSection;
