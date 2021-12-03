import React from 'react';
import { Container, Row } from 'react-bootstrap';

import NavBar from './../components/NavBar';
import UserSection from './profileSections/UserSection';
import BadgesSection from './profileSections/BadgesSection';
import SubmissionSection from './profileSections/SubmissionSection';
import PointsSection from './profileSections/PointsSection';

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

const user = {
  username: 'ronnel',
  name: 'Ronnel Javier',
  email: 'ronneljavier@gmail.com',
  picture:
    'https://lh3.googleusercontent.com/a-/AOh14GhqrK09oIp3AFwDy1cxcjfFLpNzabyvrvcIvuchMg=s96-c',
};

function ProfilePage(props) {
  return (
    <Container>
      <NavBar
        links={links}
        btnLabel='Logout'
        avatar='https://lh3.googleusercontent.com/a-/AOh14GhqrK09oIp3AFwDy1cxcjfFLpNzabyvrvcIvuchMg=s96-c'
        username='ronnel'
        isDropdown={true}
      />
      <Row xs={1} md={3} className='g-4'>
        <UserSection {...user} />
        <div class='col-lg-8'>
          <div class='ps-lg-1-6 ps-xl-5'>
            <BadgesSection />
            <SubmissionSection />
            <PointsSection />
          </div>
        </div>
      </Row>
    </Container>
  );
}

export default ProfilePage;
