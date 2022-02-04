import { useEffect, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { Redirect, useParams, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import { useGlobalContext } from '../context';
import TestCaseSection from './resultSections/TestCaseSection';

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

function ResultPage(props) {
  const {
    user,
    submissionResult,
    getSubmission,
    activity,
    findActivity,
    isLoading,
  } = useGlobalContext();
  const { _id } = useParams();
  const query = useQuery();
  console.log(query.get('email'));
  useEffect(() => {
    findActivity(_id);
    getSubmission(_id, query.get('email'));
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
      <TestCaseSection
        activity={activity}
        submissionResultObject={submissionResult}
      />
    </Container>
  );
}

export default ResultPage;
