import { useEffect, useState } from 'react';
import { CardGroup, Container, Row } from 'react-bootstrap';
import CardComponent from '../components/CardComponent';
import FilterSection from './dashboardSection/FilterSection';
import { useGlobalContext } from './../context';
import Loading from './../components/Loading';

function DashboardPage() {
  const {
    userProfile,
    status,
    subject,
    subjects,
    activities,
    handleStatus,
    handleSubject,
    getActivities,
    isLoading,
    getUserSubmission,
    userFinished,
  } = useGlobalContext();

  let [dashboardActivities, setDashboardActivities] = useState(activities);

  useEffect(() => {
    getActivities();
    getUserSubmission();
  }, []);

  useEffect(() => {
    if (subject === 'All') {
      setDashboardActivities(
        activities.filter(activity => {
          // return activity.status === status;
          if (status === 'Finished') {
            return userFinished.includes(activity._id.toString());
          } else {
            return !userFinished.includes(activity._id.toString());
          }
        })
      );
    } else {
      setDashboardActivities(
        activities.filter(activity => {
          // return activity.status === status && activity.subject === subject;
          if (status === 'Finished') {
            return (
              userFinished.includes(activity._id.toString()) &&
              activity.subject === subject
            );
          } else {
            return (
              !userFinished.includes(activity._id.toString()) &&
              activity.subject === subject
            );
          }
        })
      );
    }
  }, [status, subject]);

  if (isLoading)
    return (
      <div className='d-flex justify-content-center align-items-center'>
        <Loading />
      </div>
    );

  return (
    <>
      <Container className='mt-sm-1 mt-lg-5'>
        <FilterSection
          status={status}
          subject={subject}
          subjects={subjects}
          role={userProfile.role}
          handleStatus={handleStatus}
          handleSubject={handleSubject}
        />

        {/* <CardGroup style={{ maxWidth: '100%' }}> */}
        <CardGroup className='justify-content-center'>
          <Row xs={1} md={3} className='g-4' style={{ width: '100%' }}>
            {dashboardActivities.map((activity, index) => (
              <CardComponent {...activity} key={index} />
            ))}
          </Row>
        </CardGroup>

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
