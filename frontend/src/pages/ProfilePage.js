import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';

import UserSection from './profileSections/UserSection';
import BadgesSection from './profileSections/BadgesSection';
import SubmissionSection from './profileSections/SubmissionSection';
import PointsSection from './profileSections/PointsSection';
import { Redirect, useParams } from 'react-router';
import { useGlobalContext } from './../context';
import Loading from './../components/Loading';

function ProfilePage() {
  const { isLoading, profileInfo, findUserProfile, getUserBadge } =
    useGlobalContext();
  const { username } = useParams();
  useEffect(() => {
    findUserProfile(`${username}@gmail.com`);
    getUserBadge(`${username}@gmail.com`);
  }, []);

  if (isLoading)
    return (
      <div className='d-flex justify-content-center align-items-center'>
        <Loading />
      </div>
    );

  if (
    profileInfo &&
    Object.keys(profileInfo).length === 0 &&
    Object.getPrototypeOf(profileInfo) === Object.prototype
  )
    return <Redirect to='/not-found' />;

  return (
    <Container>
      <Row xs={1} md={3} className='g-4'>
        <UserSection {...profileInfo} />
        <div class='col-lg-8'>
          <div class='ps-lg-1-6 ps-xl-5'>
            <BadgesSection />
            {/* <SubmissionSection /> */}
            {/* <PointsSection /> */}
          </div>
        </div>
      </Row>
    </Container>
  );
}

export default ProfilePage;
