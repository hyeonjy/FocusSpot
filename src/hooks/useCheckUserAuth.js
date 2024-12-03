import { useEffect } from 'react'
import { useUserStore } from '../zustand/userStore';
import { getUserDataFromSession, googleSignOut } from '../api/googleAuth';
import { useLocation } from 'react-router-dom';

const useCheckUserAuth = (setIsSigningUp) => {
    const location = useLocation();
    const { isAuthenticated, id, setId, setName, setEmail, setProfileImg } = useUserStore();

    useEffect(() => {
        const setUserAuth = async () => {
            const hash = location.hash;
            const params = new URLSearchParams(hash.replace('#', ''));
            const token = params.get('access_token');
            const userData = token ? await getUserDataFromSession() : null;

            if (userData) {
                const { userId, email, name, profileImg } = userData;
                setId(userId);
                setName(name);
                setEmail(email);
                setProfileImg(profileImg);
                console.log('id is set')
            }
            
            if (token && !userData) {
                console.log('id ', id, 'token', token);
                setIsSigningUp(true);
            }

            return () => {
                if (!isAuthenticated) googleSignOut();
            };
        };

        setUserAuth();

    }, [id, isAuthenticated]);
    
}

export default useCheckUserAuth
