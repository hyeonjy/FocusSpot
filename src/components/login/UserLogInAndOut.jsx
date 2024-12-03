import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../../zustand/userStore";
import { googleSignIn, googleSignOut } from "../../api/googleAuth";
import { useEffect } from "react";

export const UserLogInAndOut = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated, id, setId, setName, setEmail, setProfileImg  } = useUserStore();

    const handleSignin = async () => {
        await googleSignIn();
    };
    const handleSignOut = () => {
        setIsAuthenticated(false);
        setId(null)
        setName(null)
        setEmail(null)
        setProfileImg(null);

        googleSignOut();
        navigate('/');
    };

    useEffect(() => {
        const signingIn = async () => {
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