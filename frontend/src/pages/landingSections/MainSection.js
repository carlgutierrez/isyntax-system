import React from 'react';
import { Link } from 'react-router-dom';

function MainSection(props) {
  return (
    <section className='bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start hgtMain'>
      <div className='container mt-5'>
        <div className='d-sm-flex align-items-center justify-content-between'>
          <div>
            <span className='text-center'>
              <h1>
                iSyntax<span className='text-primary'>.college</span>
              </h1>
            </span>
            <p className='lead my-4'>
              An Intelligent Gamified Web-based System for Programming Courses
            </p>
            <div className='d-grid gap-3 col-4 mx-auto mt-5'>
              <Link to='/dashboard' style={{ margin: 'auto' }}>
                <button className='btn btn-primary' type='button'>
                  Go to Dashboard
                </button>
              </Link>
              <Link to='/leaderboard' style={{ margin: 'auto' }}>
                <button className='btn btn-primary' type='button'>
                  Leaderboard
                </button>
              </Link>
            </div>
          </div>
          <img
            className='img-fluid w-50 d-none d-sm-block py-5'
            src='images/Panel_Main_Pic.svg'
            alt='Landing Page Hero'
          />
        </div>
      </div>
    </section>
  );
}

export default MainSection;
