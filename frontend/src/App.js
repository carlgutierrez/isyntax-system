import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import ActivityPage from './pages/ActivityPage';
import NotFound from './pages/NotFound';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useGlobalContext } from './context';

function App() {
  const { selectedActivities } = useGlobalContext();
  return (
    <>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/dashboard' component={DashboardPage} />
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
