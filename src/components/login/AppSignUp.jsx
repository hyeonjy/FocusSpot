import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../zustand/userStore';
import { getUserSession, uploadProfileImgToStore, uploadUserProfile } from '../../api/supabaseSignin';
import Button from '../Button';
import ImageUpload from '../ImageUpload';

export const AppSignUp = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setId, setName, setEmail, setProfileImg } = useUserStore();

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();

      const sessionData = await getUserSession();
      const session = sessionData.session; //3600초 지나면 만료되는구나
      const userEmail = session.user.email;
      const userName = e.target.nickName.value;
      const file = e.target.profileImg.files[0];

      const path = await uploadProfileImgToStore(userEmail, file);
      const newUserData = await uploadUserProfile(userName, userEmail, path);
      const { id, name, email, profile_picture: profileImg } = newUserData;
      setId(id);
      setName(name);
      setEmail(email);
      setProfileImg(profileImg);
      setIsAuthenticated(true);

      window.alert('회원 정보 등록에 성공했습니다');
      navigate('/');
    } catch (error) {
      console.error(`신규 유저 정보 생성 에러 Error: ${error}`);
      window.alert('회원 정보 등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <>
        <StH2>회원 정보 등록</StH2>
        <StForm onSubmit={handleOnSubmit}>
          <StAuthUl>
            <li>
              <ImageUpload />
            </li>
            <li>
              <StInputTitle>
                이름 <StRed>*</StRed>
              </StInputTitle>
              <StInput name='nickName' id='nickName' placeholder='이름을 입력해주세요' maxlength='10'/>
            </li>
          </StAuthUl>
          <Button size="big" color="primary" fill={true} type={'submit'} label="등록" />
        </StForm>
    </>
  );
};

const StInput = styled.input`
  display: block;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  border-bottom: 1px solid var(--color-gray5);
  font-size: 15px;

  &::placeholder {
    color: var(--color-gray5);
  }
`;

const StH2 = styled.h2`
  text-align: center;
  margin-bottom: 50px;
  font-size: 30px;
  font-weight: 500;
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StAuthUl = styled.ul`
  width: 70%;
  margin-bottom: 45px;
  li + li {
    margin-top: 28px;
  }
`;

const StInputTitle = styled.p`
  padding-left: 10px;
  font-size: 15px;
`;

const StRed = styled.span`
  color: var(--color-red);
`;
