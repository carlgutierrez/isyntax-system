import React, { useState, useContext, useEffect } from 'react';
import dummyActivities from './data/activities';

const AppContext = React.createContext();
AppContext.displayName = 'AppContext';

const AppProvider = ({ children }) => {
  const [status, setStatus] = useState('Todo');
  const [subject, setSubject] = useState('All');
  const [subjects, setSubjects] = useState([
    'All',
    'ITEC 101',
    'ITEC 102',
    'ITEC 103',
  ]);
  const [activities, setActivities] = useState(dummyActivities);

  // Dashboard Page
  const handleStatus = e => {
    setStatus(e);
  };
  const handleSubject = e => {
    setSubject(e);
  };

  return (
    <AppContext.Provider
      value={{
        status,
        subject,
        subjects,
        activities,
        setActivities,
        handleStatus,
        handleSubject,
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
