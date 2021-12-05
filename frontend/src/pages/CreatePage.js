import React from 'react';
import { useGlobalContext } from './../context';
import { Redirect } from 'react-router-dom';

function CreatePage() {
  const { userProfile } = useGlobalContext();

  if (userProfile.role === 'student') return <Redirect to='/not-found' />;
  return (
    <div>
      <h1 className='d-flex justify-content-center align-items-center text-white'>
        Create Page
      </h1>
    </div>
  );
}

export default CreatePage;
