import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import ActivityPage from './pages/ActivityPage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import StudentPage from './pages/StudentPage';
import ResultPage from './pages/ResultPage';
import LeaderboardPage from './pages/LeaderboardPage';
import NotFound from './pages/NotFound';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProtectedRoute from './auth/protected-route';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer theme='dark' />
      <NavBar />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <ProtectedRoute exact path='/dashboard' component={DashboardPage} />
        <Route exact path='/leaderboard' component={LeaderboardPage} />
        <Route exact path='/activity/:_id' component={ActivityPage} />
        <Route exact path='/profile/:username' component={ProfilePage} />
        <ProtectedRoute exact path='/create-activity' component={CreatePage} />
        <ProtectedRoute exact path='/edit-activity/:_id' component={EditPage} />
        <ProtectedRoute
          exact
          path='/student-management'
          component={StudentPage}
        />
        <ProtectedRoute exact path='/result/:_id' component={ResultPage} />
        <Route exact path='/not-found' component={NotFound} />
        <Redirect to='/not-found' />
      </Switch>
    </>
  );
}

export default App;
