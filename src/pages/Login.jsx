import { useState } from 'react';
import useCheckUserAuth from '../hooks/useCheckUserAuth';
import { UserLogInAndOut } from '../components/login/UserLogInAndOut';
import { AppSignUp } from '../components/login/AppSignUp';

const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningUp, setIsSigningUp] = useState(false);
  useCheckUserAuth({setIsSigningUp, setIsLoading});

  const view = isSigningUp ? <AppSignUp /> : <UserLogInAndOut />;

  return <>{isSigningUp ? <AppSignUp /> : <UserLogInAndOut />}</>;
};

export default Login;

