import { useEffect } from 'react';
import NavBar from './../components/NavBar';
import { CardGroup, Container, Row } from 'react-bootstrap';
import CardComponent from '../components/CardComponent';
import Paginate from './../components/Paginate';
import FilterSection from './dashboardSection/FilterSection';
import { useGlobalContext } from './../context';
import dummyActivities from './../data/activities';

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

function DashboardPage() {
  const {
    status,
    subject,
    subjects,
    activities,
    setActivities,
    handleStatus,
    handleSubject,
  } = useGlobalContext();

  useEffect(() => {
    if (subject === 'All') {
      setActivities(
        dummyActivities.filter(activity => {
          return activity.status === status;
        })
      );
    } else {
      setActivities(
        dummyActivities.filter(activity => {
          return activity.status === status && activity.subject === subject;
        })
      );
    }
  }, [status, subject]);

  return (
    <>
      <NavBar
        links={links}
        btnLabel='Logout'
        avatar='https://lh3.googleusercontent.com/a-/AOh14GhqrK09oIp3AFwDy1cxcjfFLpNzabyvrvcIvuchMg=s96-c'
        username='ronnel'
        isDropdown={true}
      />

      <Container className='mt-sm-1 mt-lg-5'>
        <FilterSection
          status={status}
          subject={subject}
          subjects={subjects}
          handleStatus={handleStatus}
          handleSubject={handleSubject}
        />

        <CardGroup style={{ maxWidth: '100%' }}>
          <Row xs={1} md={3} className='g-4' style={{ width: '100%' }}>
            {activities.map((activity, index) => (
              <CardComponent {...activity} key={index} />
            ))}
          </Row>
        </CardGroup>

        {/* <Paginate /> */}

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
