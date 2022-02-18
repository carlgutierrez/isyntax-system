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
  const [subjects, setSubjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [userActivities, setUserActivities] = useState([]);
  const [activity, setActivity] = useState({});
  const [toggleSuggestion, setToggleSuggestion] = useState(false);
  const [toggleTest, setToggleTest] = useState(false);

  const [submissionResult, setSubmissionResult] = useState({});
  const [userFinished, setUserFinished] = useState([]);
  const [teacherSubjects, setTeacherSubjects] = useState([]);
  const [allSubmissions, setAllSubmissions] = useState([]);

  const [userBadges, setUserBadges] = useState([]);
  const [newBadgeAcquired, setNewBadgeAcquired] = useState('');

  // Teacher Result Page
  const getTeacherSubjects = async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      // `/api/activity/teacher/${userProfile.email}`
      `/api/activity/teacher/${user.email}`
    );
    setTeacherSubjects(data);
    setIsLoading(false);
    return true;
  };

  const getAllSubmissions = async () => {
    setIsLoading(true);
    const { data } = await axios.get(`/api/submission`);
    setAllSubmissions(data);
    setIsLoading(false);
    return true;
  };

  // Leaderboard Page
  const getAllUsers = async () => {
    setIsLoading(true);
    const { data } = await axios.get('/api/users');
    const contextUsers = data.filter(user => {
      return user.role !== 'teacher';
    });
    setUsers(contextUsers);
    setIsLoading(false);
    return true;
  };

  // Dashboard Subjects
  const findSubjectCode = classCodeInput => {
    let allSubject = activities.filter(activity => {
      return activity.subject === classCodeInput;
    });

    // Check if user is already enrolled
    allSubject = allSubject.filter(activity => {
      return !subjects.includes(activity.subject);
    });

    if (allSubject.length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  const getUserSubjects = async () => {
    setIsLoading(true);
    const { data } = await axios.get(`/api/subject/${user.email}`);
    setSubjects(data);

    const subjectActivities = await axios.get('/api/activity');
    const userFinishedActivities = await axios.get(
      `/api/submission/${user.email}`
    );

    setUserActivities(
      subjectActivities.data.filter(activity => {
        return (
          !userFinishedActivities.data.includes(activity._id.toString()) &&
          data.includes(activity.subject)
        );
      })
    );
    setIsLoading(false);
    return true;
  };

  const addClassCode = async classCodeInput => {
    const newSubjects = [...subjects, classCodeInput];
    const { data } = axios.put(`/api/subject/${user.email}`, {
      userEmail: user.email,
      subjects: newSubjects,
    });
    console.log('new subjects', newSubjects);

    return true;
  };

  const getActivities = async () => {
    setIsLoading(true);
    const { data } = await axios.get('/api/activity');
    setActivities(data);
    setIsLoading(false);
    return true;
  };
  useEffect(() => {
    getActivities();

    if (typeof user === 'undefined') setIsLoading(true);
  }, []);

  const getUserSubmission = async () => {
    setIsLoading(true);
    const { data } = await axios.get(`/api/submission/${user.email}`);
    setUserFinished(data);
    // setActivities(data);
    setIsLoading(false);
    return true;
  };

  // Activity Page
  const findActivity = async id => {
    setIsLoading(true);
    const { data } = await axios.get(`/api/activity/${id}`);
    if (data.length !== 0) {
      setActivity({ ...data[0] });
      setIsLoading(false);
      return data;
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

    await axios.post('/api/subject', {
      userEmail: email,
      subjects: ['All'],
    });
    setSubjects(['All']);

    await axios.post('/api/badge', {
      userEmail: email,
      badges: [],
    });
    setUserBadges([]);

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

  // Edit Activity Page
  const updateActivity = async (activity, id) => {
    const { data } = await axios.put(`/api/activity/${id}`, {
      ...activity,
    });
    return data;
    // return true;
  };

  // Results Page
  const getUserBadge = async email => {
    const { data } = await axios.get(`/api/badge/${email}`);
    setUserBadges(data);
    return true;
  };

  const checkBadgeAcquired = async (activityID, email) => {
    // completedFirstActivity
    const { data } = await axios.get('/api/submission');
    let allSubmissionsArray = [];
    for (let i = 0; i < data.length; i++) {
      allSubmissionsArray.push(data[i].userEmail);
    }

    let activityCount = 0;
    for (let i = 0; i < allSubmissionsArray.length; i++) {
      if (allSubmissionsArray[i] === email) activityCount++;
    }
    if (activityCount === 1) {
      const userBadgesQuery = await axios.get(`/api/badge/${email}`);
      if (!userBadgesQuery.data.includes('completedFirstActivity')) {
        const newBadges = [...userBadgesQuery.data, 'completedFirstActivity'];
        axios.put(`/api/badge/${email}`, {
          userEmail: email,
          badges: newBadges,
        });
        setUserBadges(newBadges);
        setNewBadgeAcquired('completedFirstActivity');
        return true;
      }
    }

    // completedThreeActivities

    if (activityCount === 3) {
      const userBadgesQuery = await axios.get(`/api/badge/${email}`);
      if (!userBadgesQuery.data.includes('completedThreeActivities')) {
        const userBadgesQuery = await axios.get(`/api/badge/${email}`);
        const newBadges = [...userBadgesQuery.data, 'completedThreeActivities'];
        axios.put(`/api/badge/${email}`, {
          userEmail: email,
          badges: newBadges,
        });
        setUserBadges(newBadges);
        setNewBadgeAcquired('completedThreeActivities');
        return true;
      }
    }

    // aceAnActivity
    const totalScoreQuery = await axios.get(
      `/api/submission/${activityID}/${email}`
    );
    const totalScore = totalScoreQuery.data[0].rubricScore.reduce(
      (partialSum, a) => partialSum + a,
      0
    );

    const activityTotalQuery = await axios.get(`/api/activity/${activityID}`);
    // const activityObj = await axios.get(`/api/activity/${activity._id}`)
    if (totalScore === activityTotalQuery.data[0].items) {
      const userBadgesQuery = await axios.get(`/api/badge/${email}`);
      if (!userBadgesQuery.data.includes('aceAnActivity')) {
        const newBadges = [...userBadgesQuery.data, 'aceAnActivity'];
        axios.put(`/api/badge/${email}`, {
          userEmail: email,
          badges: newBadges,
        });
        setUserBadges(newBadges);
        setNewBadgeAcquired('aceAnActivity');
        return true;
      }
    }
  };

  // Submit Activity Page
  const postSubmission = async (
    code,
    testCasePassed,
    rubricScore,
    submissionResult,
    userProfile
  ) => {
    const { data } = await axios.post('/api/submission', {
      userEmail: user.email,
      activityID: activity._id,
      code,
      testCasePassed,
      rubricScore,
      submissionResult,
    });

    // HERE
    const updatedScore =
      userProfile.totalScore +
      rubricScore.reduce((partialSum, a) => partialSum + a, 0);
    await axios.put(
      `/api/users/${userProfile._id}`,
      // ...activity,
      {
        name: userProfile.name,
        username: userProfile.username,
        email: userProfile.email,
        picture: userProfile.picture,
        role: userProfile.role,
        totalScore: updatedScore,
      }
    );

    return true;
  };

  // Results Page
  const getSubmission = async (activityID, email) => {
    setIsLoading(true);
    const { data } = await axios.get(`/api/submission/${activityID}/${email}`);
    if (data.length !== 0) {
      setSubmissionResult({ ...data[0] });
      setIsLoading(false);
      return data;
    } else {
      setSubmissionResult({});
    }
    setIsLoading(false);
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        user, //auth0
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
        submissionResult,
        userFinished,
        teacherSubjects,
        allSubmissions,
        setToggleSuggestion,
        setToggleTest,
        findActivity,
        setIsLoading,
        findUserProfile,
        setActivities,
        handleStatus,
        handleSubject,
        getTeacherSubjects,
        getAllSubmissions,
        getAllUsers,
        getActivities,
        saveActivity,
        handleDeleteActivity,
        updateActivity,
        postSubmission,
        getSubmission,
        getUserSubmission,
        findSubjectCode,
        addClassCode,
        getUserSubjects,
        userActivities,
        setUserActivities,
        newBadgeAcquired,
        userBadges,
        checkBadgeAcquired,
        getUserBadge,
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
