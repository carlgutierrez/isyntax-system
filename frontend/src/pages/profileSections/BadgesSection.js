import React from 'react';
import { Image } from 'react-bootstrap';
import userBadges from './../../data/badges';
// const userBadges = [];

function BadgesSection() {
  return (
    <div className='mb-3'>
      <div className='text-start mb-1-6'>
        <h2 className='h1 mb-2 text-primary'>Badges</h2>
      </div>
      <div className='border-10 shadow bg-dark card-body'>
        <div className='row text-center-group'>
          {userBadges.length !== 0 ? (
            userBadges.map(({ name, picture }, index) => (
              <div className='col-lg-3 col-md-12 col-sm-12 mb-2' key={index}>
                <div className='card bg-dark text-light cards'>
                  <div className='card-body text-center'>
                    <Image
                      src={picture}
                      roundedCircle
                      style={{ width: '100%', height: '100%' }}
                    />
                    <p className='card-text'>{name}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='col-12 text-white m-4'>
              <h5 className='d-flex justify-content-center align-items-center'>
                No Badges Aquired
              </h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BadgesSection;
