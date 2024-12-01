import React from "react";
import { signIn, googleSignOut } from "../api/googleAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSignin = () => {
    signIn();
  }
  const handleSignOut = () => {
    googleSignOut();
    navigate('/');
  }

  return (
    <>
      <br />
      <button onClick={handleSignin}>구글 로그인</button>
      <br />
      <br />
      <button onClick={handleSignOut}>구글 로그아웃</button>
    </>
  )
};

export default Login;
