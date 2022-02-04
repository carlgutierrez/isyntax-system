import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Loading from '../components/Loading';
import { useGlobalContext } from '../context';
import StudentTable from './studentSections/StudentTable';
import { Redirect } from 'react-router';

function StudentPage(props) {
  const {
    userProfile,
    users,
    isLoading,
    getAllUsers,
    getTeacherSubjects,
    getAllSubmissions,
    teacherSubjects,
    allSubmissions,
  } = useGlobalContext();
  useEffect(() => {
    getAllUsers();
    getTeacherSubjects();
    getAllSubmissions();
  }, []);

  if (isLoading)
    return (
      <div className='d-flex justify-content-center align-items-center'>
        <Loading />
      </div>
    );

  if (userProfile.role === 'student') return <Redirect to='/not-found' />;

  return (
    <Container>
      <StudentTable
        users={users}
        teacherSubjects={teacherSubjects}
        allSubmissions={allSubmissions}
      />
    </Container>
  );
}

export default StudentPage;
