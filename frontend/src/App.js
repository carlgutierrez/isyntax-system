import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import ActivityPage from './pages/ActivityPage';
import NotFound from './pages/NotFound';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProtectedRoute from './auth/protected-route';

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <ProtectedRoute exact path='/dashboard' component={DashboardPage} />
        <Route exact path='/activity/:_id' component={ActivityPage} />
        {/* <Route exact path='/leaderboard' component={Leaderboard} /> */}
        <Route exact path='/profile/:username' component={ProfilePage} />
        <Route exact path='/not-found' component={NotFound} />
        <Redirect to='/not-found' />
      </Switch>
    </>
  );
}

export default App;
