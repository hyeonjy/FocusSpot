import { signIn, googleSignOut } from "../api/googleAuth";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../zustand/userStore";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, isGonnaSignIn, setIsGonnaSignIn } = useUserStore();
  const token = window.localStorage.getItem("sb-uehotuivypwxyqiejuvc-auth-token");
  const isToken = (token) ? true : false;
  const userData = true; //토큰이 있으면 테이블에서 유저 데이터를 받아오도록 할 것이다.

  const handleSignin = () => {
    signIn();
  }
  const handleSignOut = () => {
    setIsGonnaSignIn(false);
    googleSignOut();
    setIsAuthenticated(false);//재렌더링 원인
    navigate('/');
  }

  if (isToken && !userData) {
    //소셜 로그인 되었으나 멤버가 아님. 정보를 마저 채우는 화면으로 넘어가도록 하자.
    //정보를 다 채우면 supabase 테이블 업데이트, 
    //유저 정보(닉네임과 이메일) 받아와서 zustand 상태 업데이트
    //그리고 setIsAuthenticated(true);
    //홈으로
  }

  if (isToken && userData) {
    //멤버가 로그인했다.
    //유저 정보(닉네임과 이메일) 받아와서 zustand 상태 업데이트, 
    
    if (isGonnaSignIn && !isAuthenticated) {
      console.log('sign in! isGonnaSignIn?', isGonnaSignIn);
      setIsAuthenticated(true);
      window.alert('로그인에 성공했습니다. 홈으로 갑니다');
      navigate('/');
    }
  }

  //유저가 Authenticated 되었을 때 보여주는 화면과 그렇지 않을 때 보여주는 화면은 달라야한다.
  return (
    <>
      {
        isAuthenticated ?
          <button onClick={handleSignOut}>구글 로그아웃</button>
          :
          <button onClick={handleSignin}>구글 로그인</button>
      }
    </>
  )
};

export default Login;
