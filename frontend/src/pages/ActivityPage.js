import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import InstructionSection from './activitySections/InstructionSection';
import Ide from './../components/Ide';
import { useGlobalContext } from './../context';
import { Redirect, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Loading from './../components/Loading';

import axios from 'axios';

function ActivityPage() {
  const {
    isLoading,
    userProfile,
    activity,
    findActivity,
    setToggleSuggestion,
    setToggleTest,
  } = useGlobalContext();

  const [userFinished, setUserFinished] = useState([]);
  const getUserSubmission = async () => {
    const { data } = await axios.get(`/api/submission`);
    setUserFinished(
      data.filter(submission => {
        return submission.activityID === _id.toString();
      })
    );
    return true;
  };

  const { _id } = useParams();
  useEffect(() => {
    findActivity(_id);
    setToggleSuggestion(false);
    setToggleTest(false);
    getUserSubmission();
  }, []);

  if (isLoading)
    return (
      <div className='d-flex justify-content-center align-items-center'>
        <Loading />
      </div>
    );

  if (
    activity &&
    Object.keys(activity).length === 0 &&
    Object.getPrototypeOf(activity) === Object.prototype
  )
    return <Redirect to='/not-found' />;

  return (
    <Container style={{ height: '160vh' }}>
      {/* <Link to='/dashboard'> */}
      <a href='/dashboard'>
        <h4 className='m-2'>
          <i className='bi bi-chevron-left'></i>
        </h4>
      </a>
      <InstructionSection {...activity} />
      <Ide
        activity={activity}
        id={_id}
        userFinished={userFinished}
        // role={userProfile.role}
        // email={userProfile.email}
        userProfile={userProfile}
      />
    </Container>
  );
}

export default ActivityPage;
