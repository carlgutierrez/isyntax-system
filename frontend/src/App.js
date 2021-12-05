import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import ActivityPage from './pages/ActivityPage';
import CreatePage from './pages/CreatePage';
import NotFound from './pages/NotFound';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProtectedRoute from './auth/protected-route';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      <NavBar />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <ProtectedRoute exact path='/dashboard' component={DashboardPage} />
        <Route exact path='/activity/:_id' component={ActivityPage} />
        <Route exact path='/profile/:username' component={ProfilePage} />
        <ProtectedRoute exact path='/create-activity' component={CreatePage} />
        <Route exact path='/not-found' component={NotFound} />
        <Redirect to='/not-found' />
      </Switch>
    </>
  );
}

export default App;
