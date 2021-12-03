import React from 'react';
import { Image } from 'react-bootstrap';

const userBadges = [
  {
    name: 'Badge 1',
    picture:
      'https://lh3.googleusercontent.com/a-/AOh14GhqrK09oIp3AFwDy1cxcjfFLpNzabyvrvcIvuchMg=s96-c',
  },
  {
    name: 'Badge 2',
    picture:
      'https://lh3.googleusercontent.com/a-/AOh14GhqrK09oIp3AFwDy1cxcjfFLpNzabyvrvcIvuchMg=s96-c',
  },
  {
    name: 'Badge 3',
    picture:
      'https://lh3.googleusercontent.com/a-/AOh14GhqrK09oIp3AFwDy1cxcjfFLpNzabyvrvcIvuchMg=s96-c',
  },
  {
    name: 'Badge 4',
    picture:
      'https://lh3.googleusercontent.com/a-/AOh14GhqrK09oIp3AFwDy1cxcjfFLpNzabyvrvcIvuchMg=s96-c',
  },
  {
    name: 'Badge 5',
    picture:
      'https://lh3.googleusercontent.com/a-/AOh14GhqrK09oIp3AFwDy1cxcjfFLpNzabyvrvcIvuchMg=s96-c',
  },
];

function BadgesSection() {
  return (
    <div className='mb-3'>
      <div className='text-start mb-1-6'>
        <h2 className='h1 mb-2 text-primary'>Badges</h2>
      </div>
      <div className='border-10 shadow bg-dark card-body'>
        <div className='row text-center-group'>
          {userBadges.map(({ name, picture }, index) => (
            <div className='col-md'>
              <div className='card bg-dark text-light cards'>
                <div className='card-body text-center'>
                  <Image src={picture} roundedCircle />
                  <p className='card-text'>{name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BadgesSection;
