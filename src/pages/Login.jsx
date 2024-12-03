import { googleSignOut, getUserAuth, googleSignIn, getUserData } from '../api/googleAuth';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useUserStore } from '../zustand/userStore';
import { useEffect, useState } from 'react';
import supabase from '../api/superbaseClient';
import styled from 'styled-components';

const AppSignUp = () => {
  const navigate = useNavigate();

  const { setIsAuthenticated } = useUserStore();
  const handleSignOut = () => {
    setIsAuthenticated(false);
    googleSignOut();
    navigate('/');
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { data: seesionData, error: sessionErr } = await supabase.auth.getSession();
    const session = seesionData.session; //3600초 지나면 만료되는구나
    const userEmail = session.user.email;
    const userName = e.target.nickName.value;
    const file = e.target.profilePhoto.files[0];
    const date = new Date().getTime();
    if (sessionErr) console.error(sessionErr);

    const { data, error } = await supabase.storage
      .from('profile-images')
      .upload(`${userEmail}/${date}_${file.name}`, file);
    if (error) console.error(error);

    const { data: imgPath, error: pathErr } = supabase.storage.from('profile-images').getPublicUrl(data.path);
    if (pathErr) console.error(pathErr);

    const { error: tableErr } = await supabase
      .from('users')
      .insert({ name: userName, email: userEmail, profile_picture: imgPath.publicUrl });
    if (error) console.error(tableErr);

    setIsAuthenticated(true);
    navigate('/');
  };

  return (
    <>
      <div>start signing up!</div>
      <StTestForm onSubmit={handleOnSubmit}>
        <label htmlFor="profilePhoto">프로필 사진</label>
        <input type="file" name="profilePhoto" id="profilePhoto" accept="image/*" />

        <label htmlFor="nickName">이름</label>
        <input type="text" id="nickName" name="nickName" />

        <button>제출</button>
      </StTestForm>

      <button onClick={handleSignOut}>세션아웃</button>
    </>
  );
};

const UserLogInAndOut = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, id} = useUserStore();

  const handleSignin = async () => {
    await googleSignIn();
  };
  const handleSignOut = () => {
    setIsAuthenticated(false);
    googleSignOut();
    navigate('/');
  };

  useEffect(() => {
    const signingIn = async () => {
      const { data, error } = await supabase.auth.getSession();
      const isSession = data.session;
      //if (isSession) setId(true); //나중에 supabase에서 데이터 가져오는 로직으로 바꾸기
      //유저 데이터가 supabase에 있었으면 true, 없으면 false
      const hash = location.hash;
      const params = new URLSearchParams(hash.replace('#', ''));
      const token = params.get('access_token');

      if (token && id) {
        setIsAuthenticated(true);
        window.alert('로그인에 성공했습니다. 홈으로 갑니다');
        navigate('/');
      }
    };
    signingIn();
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <button onClick={handleSignOut}>구글 로그아웃</button>
      ) : (
        <button onClick={handleSignin}>구글 로그인</button>
      )}
    </>
  );
};

const Login = () => {
  const { isAuthenticated, id, setId, setName, setEmail, setProfileImg } = useUserStore();
  const location = useLocation();
  const [isSigningUp, setIsSigningUp] = useState(false);

  useEffect(() => {
    const hash = location.hash;
    const params = new URLSearchParams(hash.replace('#', ''));
    const token = params.get('access_token');

    const checkUserAuth = async () => {
      const userData = await getUserData();
      if (userData) {
        const { userId, email, name, profileImg } = userData;
        setId(userId);
        setName(name);
        setEmail(email);
        setProfileImg(profileImg);
      }

      if (token && !id) {
        setIsSigningUp(true);
      }
    };

    checkUserAuth();

    return () => {
      if (!isAuthenticated) googleSignOut();
    };
  }, [id, isAuthenticated]);

  return <>{isSigningUp ? <AppSignUp /> : <UserLogInAndOut />}</>;
};

export default Login;

const StTestForm = styled.form`
  display: flex;
  flex-direction: column;
`;