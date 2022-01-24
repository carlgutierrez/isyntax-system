import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Redirect, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { useGlobalContext } from '../context';
import TestCaseSection from './resultSections/TestCaseSection';

function ResultPage(props) {
  const { activity, findActivity, isLoading } = useGlobalContext();
  const { _id } = useParams();
  useEffect(() => {
    findActivity(_id);
  }, []);

  if (isLoading)
    return (
      <div className='d-flex justify-content-center align-items-center'>
        <Loading />
      </div>
    );

  // if (
  //   activity &&
  //   Object.keys(activity).length === 0 &&
  //   Object.getPrototypeOf(activity) === Object.prototype
  // )
  //   return <Redirect to='/not-found' />;
  return (
    <Container className='text-white'>
      <TestCaseSection {...activity} />
    </Container>
  );
}

export default ResultPage;
