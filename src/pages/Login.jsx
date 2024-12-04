import { useState } from 'react';
import useCheckUserAuth from '../hooks/useCheckUserAuth';
import { UserLogIn } from '../components/login/UserLogIn';
import { AppSignUp } from '../components/login/AppSignUp';
import styled from 'styled-components';
import Spinner from '../components/common/Spinner';

const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningUp, setIsSigningUp] = useState(false);
  useCheckUserAuth({ setIsSigningUp, setIsLoading });

  if (isLoading) return <StContainer><Spinner /></StContainer>;
  
  return <StContainer>{isSigningUp ? <AppSignUp /> : <UserLogIn />}</StContainer>;
};

export default Login;

const StContainer = styled.section`
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
  padding: 50px;
  background: var(--color-white);
  border-radius: 5px;
  box-shadow: var(--drop-shadow);
  & > button {
    margin: 0 auto;
  }
`;
