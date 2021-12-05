import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import InstructionSection from './activitySections/InstructionSection';
import Ide from './../components/Ide';
import { useGlobalContext } from './../context';
import { Redirect, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Loading from './../components/Loading';

function ActivityPage() {
  const {
    isLoading,
    userProfile,
    activity,
    findActivity,
    setToggleSuggestion,
    setToggleTest,
  } = useGlobalContext();

  const { _id } = useParams();
  useEffect(() => {
    findActivity(_id);
    setToggleSuggestion(false);
    setToggleTest(false);
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
      <Link to='/dashboard'>
        <h4 className='m-2'>
          <i className='bi bi-chevron-left'></i>
        </h4>
      </Link>
      <InstructionSection {...activity} />
      <Ide status={activity.status} role={userProfile.role} />
    </Container>
  );
}

export default ActivityPage;
