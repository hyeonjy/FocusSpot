import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../zustand/userStore";
import { googleSignOut } from "../../api/googleAuth";
import { getUserSession, uploadProfileImgToStore, uploadUserProfile } from "../../api/supabaseSignin";

export const AppSignUp = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useUserStore();
    const handleSignOut = () => {
        setIsAuthenticated(false);
        googleSignOut();
        navigate('/');
    };
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const sessionData = await getUserSession();
        const session = sessionData.session; //3600초 지나면 만료되는구나
        const userEmail = session.user.email;
        const userName = e.target.nickName.value;
        const file = e.target.profilePhoto.files[0];
        

        const path = await uploadProfileImgToStore(userEmail, file);
        await uploadUserProfile(userName, userEmail, path);

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

const StTestForm = styled.form`
  display: flex;
  flex-direction: column;
`;