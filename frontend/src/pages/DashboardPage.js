import { useEffect, useState } from 'react';
import { CardGroup, Container, Row } from 'react-bootstrap';
import CardComponent from '../components/CardComponent';
import FilterSection from './dashboardSection/FilterSection';
import { useGlobalContext } from './../context';

function DashboardPage() {
  const {
    userProfile,
    status,
    subject,
    subjects,
    activities,
    // setActivities,
    handleStatus,
    handleSubject,
  } = useGlobalContext();

  let [dashboardActivities, setDashboardActivities] = useState(activities);

  useEffect(() => {
    if (subject === 'All') {
      setDashboardActivities(
        activities.filter(activity => {
          return activity.status === status;
        })
      );
    } else {
      setDashboardActivities(
        activities.filter(activity => {
          return activity.status === status && activity.subject === subject;
        })
      );
    }

    // if (subject === 'All') {
    //   setActivities(
    //     activities.filter(activity => {
    //       return activity.status === status;
    //     })
    //   );
    // } else {
    //   setActivities(
    //     activities.filter(activity => {
    //       return activity.status === status && activity.subject === subject;
    //     })
    //   );
    // }
  }, [status, subject]);

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
