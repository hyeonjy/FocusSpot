import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../zustand/userStore';
import { googleSignIn } from '../../api/googleAuth';
import { useEffect } from 'react';
import google_icon from '../../../public/google_icon.svg';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import theme from '../../styles/theme';

export const UserLogIn = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, id } = useUserStore();

  const handleSignin = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error(`소셜 로그인 실패 Error: ${error}`);
      Swal.fire({
        text: "소셜 로그인에 실패했습니다. 다시 시도해주세요.",
        icon: "error"
      });
    }
  };

  useEffect(() => {
    if (id) {
      Swal.fire({
        text: "로그인에 성공했습니다. 홈으로 갑니다.",
        icon: "success",
        iconColor: 'var(--color-primary)',
      }).then(() => {
        navigate('/');
      });
    }

    return () => {
      if (id) setIsAuthenticated(true);
    };
  }, [id]);

  return (
    <>
      <StH2>로그인</StH2>
      <StSocialLoginBtn onClick={handleSignin}>
        <img src={google_icon} alt="signin_button_icon" />
        <span>Google 계정으로 시작</span>
      </StSocialLoginBtn>
      <StRefer>Google 계정으로 시작할 수 있습니다</StRefer>
    </>
  );
};

const StH2 = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: 500;
  @media ${theme.device.mobile} {
  font-size: 20px;
  }
`;

const StSocialLoginBtn = styled.button`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border: 1px solid var(--color-gray6);
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  color: var(--color-gray2);
  span {
    display: block;
    margin-top: 2px;
  }
`;

const StRefer = styled.p`
  margin-top: 15px;
  font-size: 13px;
  color: var(--color-gray3);
  text-align: center;
`;
