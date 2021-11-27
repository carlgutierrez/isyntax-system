import React from 'react';

function Paginate(props) {
  return (
    // <div className='container mt-5'>
    <nav aria-label='...' className='mt-4'>
      <ul className='pagination justify-content-end'>
        <li className='page-item'>
          <a className='page-link' href='#!'>
            Previous
          </a>
        </li>
        <li className='page-item'>
          <a className='page-link' href='#!'>
            1
          </a>
        </li>
        <li className='page-item active'>
          <span className='page-link'>
            {/* 2<span className='sr-only'>(current)</span> */}2
          </span>
        </li>
        <li className='page-item'>
          <a className='page-link' href='#!'>
            3
          </a>
        </li>
        <li className='page-item'>
          <a className='page-link' href='#!'>
            Next
          </a>
        </li>
      </ul>
    </nav>
    // </div>
  );
}

export default Paginate;
