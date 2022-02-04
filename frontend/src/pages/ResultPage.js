import { useEffect, useMemo } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { Redirect, useParams, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import { useGlobalContext } from '../context';
import TestCaseSection from './resultSections/TestCaseSection';
import NewBadgeAcquired from '../components/NewBadgeAcquired';

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

function ResultPage(props) {
  const {
    getUserBadge,
    checkBadgeAcquired,
    newBadgeAcquired,
    submissionResult,
    getSubmission,
    activity,
    findActivity,
    isLoading,
  } = useGlobalContext();
  const { _id } = useParams();
  const query = useQuery();
  useEffect(() => {
    findActivity(_id);
    getSubmission(_id, query.get('email'));
    getUserBadge(query.get('email'));
    checkBadgeAcquired(_id, query.get('email'));
  }, []);

  if (isLoading)
    return (
      <div className='d-flex justify-content-center align-items-center'>
        <Loading />
      </div>
    );

  // if (
  //   !isLoading &&
  //   activity &&
  //   Object.keys(activity).length === 0 &&
  //   Object.getPrototypeOf(activity) === Object.prototype &&
  //   submissionResult &&
  //   Object.keys(submissionResult).length === 0 &&
  //   Object.getPrototypeOf(submissionResult) === Object.prototype
  // )
  //   return <Redirect to='/not-found' />;

  return (
    <Container className='text-white'>
      {newBadgeAcquired === 'completedFirstActivity' && (
        <NewBadgeAcquired
          name={'Completed First Activity'}
          picture={'/images/completedFirstActivity.svg'}
        />
      )}
      {newBadgeAcquired === 'completedThreeActivities' && (
        <NewBadgeAcquired
          name={'Completed Three Activities'}
          picture={'/images/completedThreeActivities.svg'}
        />
      )}
      {newBadgeAcquired === 'aceAnActivity' && (
        <NewBadgeAcquired
          name={'Ace an Activity'}
          picture={'/images/aceAnActivity.svg'}
        />
      )}
      <TestCaseSection
        activity={activity}
        submissionResultObject={submissionResult}
      />
    </Container>
  );
}

export default ResultPage;
