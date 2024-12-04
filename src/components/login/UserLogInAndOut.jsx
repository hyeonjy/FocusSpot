import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../../zustand/userStore";
import { googleSignIn, googleSignOut } from "../../api/googleAuth";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Button";

export const UserLogInAndOut = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [isloggingOut, setIsLogginOut] = useState(false);
    const { isAuthenticated, setIsAuthenticated, id, setId, setName, setEmail, setProfileImg } = useUserStore();

    const handleSignin = async () => {
        try{
            await googleSignIn();
        } catch(error) {
            console.error(`소셜 로그인 실패 Error: ${error}`);
            window.alert('소셜 로그인에 실패했습니다. 다시 시도해주세요.');
        }
    };
    const handleSignOut = () => {
        setIsLogginOut(true);
        setId(null)
        setName(null)
        setEmail(null)
        setProfileImg(null);

        googleSignOut();
        navigate('/');
    };

    useEffect(() => {
        const hash = location.hash;
        const params = new URLSearchParams(hash.replace('#', ''));
        const userToken = params.get('access_token');

        if (userToken) setToken(true);
        if (token && id) {
            window.alert('로그인에 성공했습니다. 홈으로 갑니다.');
            navigate('/');
        }
        
        return () => {
            if (token && id) setIsAuthenticated(true);
            if (isloggingOut) setIsAuthenticated(false);
        }
    }, [id, isloggingOut]);

    return (
        <StContainer>
            {isAuthenticated ? (
                <>
                    <StH2>로그아웃</StH2>
                    <Button size="big" color="primary" fill={true} label="로그아웃" handleClick={handleSignOut} />
                </>
            ) : (
                <>
                    <StH2>로그인</StH2>
                    <Button size="big" color="primary" fill={true} label="로그인" handleClick={handleSignin} />
                </>
            )}
        </StContainer>
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