import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

const LoginButton = () => {
  const redirectPath =
    window.location.pathname === '/' ? '/dashboard' : window.location.pathname;

  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      variant='outline-primary'
      className='px-4 mx-3'
      onClick={() => {
        loginWithRedirect({
          appState: {
            returnTo: redirectPath,
          },
        });
      }}
    >
      Login
    </Button>
  );
};

export default LoginButton;
