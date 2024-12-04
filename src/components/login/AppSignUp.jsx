import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../zustand/userStore';
import { googleSignOut } from '../../api/googleAuth';
import { getUserSession, uploadProfileImgToStore, uploadUserProfile } from '../../api/supabaseSignin';
import Button from '../Button';
import InputText from '../InputText';
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
      window.alert('세션 만료?');
    }
  };

  return (
    <>
      <StContainer>
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
              <InputText inputName={'nickName'} placeholderText="이름을 입력해주세요" />
            </li>
          </StAuthUl>
          <Button size="big" color="primary" fill={true} type={'submit'} label="등록" />
        </StForm>
      </StContainer>
    </>
  );
};

const StContainer = styled.section`
  width: 90%;
  max-width: ${(props) => (props.mode === 'login' ? '400px' : '750px')};
  margin: 0 auto;
  padding: 50px;
  background: var(--color-white);
  border-radius: 5px;
  box-shadow: var(--drop-shadow);
  & > button {
    margin: 0 auto;
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
  width: 50%;
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
