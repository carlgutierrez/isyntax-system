import React, { useState, useContext, useEffect } from 'react';
import dummyActivities from './data/activities';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const AppContext = React.createContext();
AppContext.displayName = 'AppContext';

const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profileInfo, setProfileInfo] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const [status, setStatus] = useState('Todo');
  const [subject, setSubject] = useState('All');
  const subjects = ['All', 'ITEC 101', 'ITEC 102', 'ITEC 103'];
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState({});
  const [toggleSuggestion, setToggleSuggestion] = useState(false);
  const [toggleTest, setToggleTest] = useState(false);

  // Leaderboard Page
  const getAllUsers = async () => {
    setIsLoading(true);
    const { data } = await axios.get('/api/users');
    setUsers(data);
    setIsLoading(false);
    return true;
  };

  // Dashboard Subjects
  const getActivities = async () => {
    setIsLoading(true);
    const { data } = await axios.get('/api/activity');
    setActivities(data);
    setIsLoading(false);
    return true;
  };
  useEffect(() => {
    getActivities();
  }, []);

  // Activity Page
  const findActivity = async id => {
    setIsLoading(true);
    const { data } = await axios.get(`/api/activity/${id}`);
    if (data.length !== 0) {
      setActivity({ ...data[0] });
    }
    setIsLoading(false);
    return true;
  };

  // For Login
  const { user } = useAuth0();
  const createUser = async (name, email, picture) => {
    const { data } = await axios.post(`/api/users`, {
      name,
      email,
      picture,
    });
    return setUserProfile({
      ...data,
    });
  };

  const findUser = async (name, email, picture) => {
    const { data } = await axios.get(`/api/users/${email}`);
    if (data.length === 0) {
      return createUser(name, email, picture);
      // return false;
    }
    setUserProfile({
      ...data[0],
    });
    return true;
  };

  useEffect(() => {
    if (user) {
      findUser(user.name, user.email, user.picture);
    } else {
      setUserProfile({});
    }
  }, [user]);

  // Profile Page
  // const findUserProfile = async (email, userUsername = null) => {
  const findUserProfile = async email => {
    setIsLoading(true);
    const { data } = await axios.get(`/api/users/${email}`);
    if (data.length !== 0) {
      setProfileInfo({ ...data[0] });
    }
    setIsLoading(false);

    // if (data.length === 0) {
    //   setIsUserPresent(false);
    // } else {
    //   // let myProfile = 'false';
    //   // if (data[0].username === userUsername) {
    //   //   myProfile = 'true';
    //   // }
    //   // setProfileInfo({ ...data[0], myProfile: myProfile });
    //   setIsUserPresent(true);
    //   setProfileInfo({ ...data[0] });
    // }

    return true;
  };

  // Dashboard Page
  const handleStatus = e => {
    setStatus(e);
  };
  const handleSubject = e => {
    setSubject(e);
  };

  // Create Activity Page
  const saveActivity = async activity => {
    const { data } = await axios.post(`/api/activity`, {
      ...activity,
    });
    return data;
    // return true;
  };

  const handleDeleteActivity = async id => {
    const { data } = await axios.delete(`/api/activity/${id}`);
    return data;
  };

  return (
    <AppContext.Provider
      value={{
        users,
        isLoading,
        profileInfo,
        userProfile,
        status,
        subject,
        subjects,
        activities,
        activity,
        toggleSuggestion,
        toggleTest,
        setToggleSuggestion,
        setToggleTest,
        findActivity,
        setIsLoading,
        findUserProfile,
        setActivities,
        handleStatus,
        handleSubject,
        getAllUsers,
        getActivities,
        saveActivity,
        handleDeleteActivity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
