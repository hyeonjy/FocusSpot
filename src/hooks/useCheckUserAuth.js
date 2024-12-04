import { useEffect } from 'react'
import { useUserStore } from '../zustand/userStore';
import { getUserDataFromSession, googleSignOut } from '../api/googleAuth';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const useCheckUserAuth = ({ setIsSigningUp, setIsLoading }) => {
    const location = useLocation();
    const { isAuthenticated, setUserData } = useUserStore();

    useEffect(() => {
        const setUserAuth = async () => {
            try {
                //소셜 로그인 성공 이후 돌아온 유저를 해시 속 토큰 유무로 구분
                const hash = location.hash;
                const params = new URLSearchParams(hash.replace('#', ''));
                const token = params.get('access_token');
                
                //토큰이 있다면 유저 테이블에 유저가 등록되어 있는지 확인
                const userData = token ? await getUserDataFromSession() : null;
                //유저가 등록되어 있다면 전역상태로 관리하고 있는 유저 정보 업데이트
                if (userData) {
                    const { userId, email, name, profileImg } = userData;
                    setUserData({ userId, email, name, profileImg });
                }

                
                if (token && !userData) {
                    //토큰이 있으나 아직 유저 데이터가 없는 유저는 미등록 유저이므로 회원 정보 등록창
                    setIsSigningUp(true);
                } else {
                    //그렇지 않은 유저는 일반창
                    setIsSigningUp(false);
                }
                setIsLoading(false);
            } catch (error) {
                console.error(`회원 정보를 불러오는 중에 문제가 발생했습니다 Error: ${error}`);
                Swal.fire({
                    text: "회원 정보 불러오기에 실패했습니다.",
                    icon: "error",
                    iconColor: 'var(--color-primary)',
                });
            } finally { 
                setIsLoading(false); 
            }
        };
        setUserAuth();

        return () => {
            //유저가 회원 정보 등록중에 창을 나간다면 세션을 끊음
            if (!isAuthenticated) googleSignOut();
        }

    }, []);

}

export default useCheckUserAuth
