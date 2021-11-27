import React from 'react';
import NavBar from './../components/NavBar';
import { CardGroup, Container, Row, Col, Card } from 'react-bootstrap';
import CardComponent from '../components/CardComponent';
import Paginate from './../components/Paginate';

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

const activities = [
  {
    _id: '01',
    title: 'Activity 1',
    items: 50,
    dueDate: '1 Nov, 3:00 PM',
    dateCreated: '20 Oct',
    postedBy: 'Ronnel "Big Daddy" Javier',
  },
  {
    _id: '02',
    title: 'Activity 2',
    items: 75,
    dueDate: '20 Nov, 3:00 PM',
    dateCreated: '20 Oct',
    postedBy: 'Lance Jericho Pestaño Jr.',
  },
  {
    _id: '03',
    title: 'Activity 3',
    items: 100,
    dueDate: '20 Nov, 3:00 PM',
    dateCreated: '20 Oct',
    postedBy: 'Ronnel "Big Daddy" Javier',
  },
  {
    _id: '04',
    title: 'Activity 4',
    items: 15,
    dueDate: '1 Nov, 3:00 PM',
    dateCreated: '20 Oct',
    postedBy: 'Lance Jericho Pestaño Jr.',
  },
  {
    _id: '05',
    title: 'Activity 5',
    items: 50,
    dueDate: '19 Dec, 3:00 PM',
    dateCreated: '20 Oct',
    postedBy: 'Ronnel "Big Daddy" Javier',
  },
  {
    _id: '06',
    title: 'Activity 6',
    items: 69,
    dueDate: '25 Dec, 3:00 PM',
    dateCreated: '20 Oct',
    postedBy: 'John Christian "AquaHub Sponsor" Austria',
  },
];

function DashboardPage() {
  return (
    <>
      <NavBar
        links={links}
        btnLabel='Logout'
        avatar='https://lh3.googleusercontent.com/a-/AOh14GhqrK09oIp3AFwDy1cxcjfFLpNzabyvrvcIvuchMg=s96-c'
        isDropdown={true}
      />

      <Container className='mt-5'>
        <CardGroup>
          <Row xs={1} md={3} className='g-4'>
            {activities.map((activity, index) => (
              <CardComponent {...activity} key={index} />
            ))}
          </Row>
        </CardGroup>

        <Paginate />

        {/* <div class='bottomleft'>
          <img
            src='images/coder.svg'
            alt='dashboard background'
            class='img-fluid d-none d-sm-block images'
          />
        </div> */}
      </Container>
    </>
  );
}

export default DashboardPage;
