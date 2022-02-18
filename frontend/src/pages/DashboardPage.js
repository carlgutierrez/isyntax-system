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
    getUserSubjects,
    userActivities,
    setUserActivities,
  } = useGlobalContext();

  useEffect(() => {
    getActivities();
    getUserSubmission();
    getUserSubjects();
  }, []);

  useEffect(() => {
    if (subject === 'All') {
      setUserActivities(
        activities.filter(activity => {
          if (status === 'Finished') {
            return (
              userFinished.includes(activity._id.toString()) &&
              subjects.includes(activity.subject)
            );
          } else {
            return (
              !userFinished.includes(activity._id.toString()) &&
              subjects.includes(activity.subject)
            );
          }
        })
      );
    } else {
      setUserActivities(
        activities.filter(activity => {
          if (status === 'Finished') {
            return (
              userFinished.includes(activity._id.toString()) &&
              activity.subject === subject &&
              subjects.includes(activity.subject)
            );
          } else {
            return (
              !userFinished.includes(activity._id.toString()) &&
              activity.subject === subject &&
              subjects.includes(activity.subject)
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
            {userProfile.role === 'student'
              ? userActivities.map((activity, index) => (
                  <CardComponent {...activity} key={index} />
                ))
              : activities
                  .filter(activity => {
                    return activity.postedBy === userProfile.email;
                  })
                  .map((activity, index) => (
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
