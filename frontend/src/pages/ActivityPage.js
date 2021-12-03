import React from 'react';
import { Container } from 'react-bootstrap';
import InstructionSection from './activitySections/InstructionSection';
import Ide from './../components/Ide';
import SuggestionSection from './activitySections/SuggestionSection';
import { useGlobalContext } from './../context';
import { Redirect, useParams } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';

function ActivityPage() {
  const { activities } = useGlobalContext();
  const { isAuthenticated } = useAuth0();

  const { _id } = useParams();
  let activity = activities.filter(activity => {
    return activity._id === _id;
  });

  if (activity.length === 0) return <Redirect to='/not-found' />;

  return (
    <Container>
      <InstructionSection {...activity[0]} />
      <Ide status={activity[0].status} />
      {activity[0].status === 'Todo' && isAuthenticated && (
        <SuggestionSection />
      )}
    </Container>
  );
}

export default ActivityPage;
