import React from 'react';
import NavBar from '../components/NavBar';
import { Container } from 'react-bootstrap';
import InstructionSection from './activitySections/InstructionSection';
import Ide from './../components/Ide';
import SuggestionSection from './activitySections/SuggestionSection';
import { useGlobalContext } from './../context';
import { Redirect, useParams } from 'react-router';

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

function ActivityPage() {
  const { activities } = useGlobalContext();
  const { _id } = useParams();
  let activity = activities.filter(activity => {
    return activity._id === _id;
  });

  if (activity.length === 0) return <Redirect to='/not-found' />;

  return (
    <>
      <NavBar
        links={links}
        btnLabel='Logout'
        avatar='https://lh3.googleusercontent.com/a-/AOh14GhqrK09oIp3AFwDy1cxcjfFLpNzabyvrvcIvuchMg=s96-c'
        username='ronnel'
        isDropdown={true}
      />

      <Container>
        <InstructionSection {...activity[0]} />
        <Ide status={activity[0].status} />
        {activity[0].status === 'Todo' && <SuggestionSection />}
      </Container>
    </>
  );
}

export default ActivityPage;
