import { useState } from 'react';
import useCheckUserAuth from '../hooks/useCheckUserAuth';
import { UserLogInAndOut } from '../components/login/UserLogInAndOut';
import { AppSignUp } from '../components/login/AppSignUp';

const Login = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  useCheckUserAuth(setIsSigningUp);

  return <>{isSigningUp ? <AppSignUp /> : <UserLogInAndOut />}</>;
};

export default Login;

