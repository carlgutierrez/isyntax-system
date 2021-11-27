import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/dashboard' component={DashboardPage} />
        {/* <Route exact path='/activity/:_id' component={Activity} /> */}
        {/* <Route exact path='/leaderboard' component={Leaderboard} /> */}
        {/* <Route exact path='/:username' component={Profile} /> */}
        {/* <Route exact path='/not-found' component={NotFound} /> */}
        {/* <Redirect to='/not-found' /> */}
      </Switch>
    </>
  );
}

export default App;
