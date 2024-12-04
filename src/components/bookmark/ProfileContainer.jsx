import React from 'react';
import styled from 'styled-components';
import Button from '../Button';
import { useUserStore } from '../../zustand/userStore';

const ProfileContainer = ({ openModal }) => {
  const { name, email, profileImg } = useUserStore();
  return (
    <StProfileSection>
      <StProfilePicture alt={'profile image'} src={profileImg} />
      <StProfileDetails>
        <StH1>{name}</StH1>
        <StUserEmail>{email}</StUserEmail>
        <Button size="small" color="primary" fill={false} label="프로필 수정" handleClick={openModal} />
      </StProfileDetails>
    </StProfileSection>
  );
};

const StProfileSection = styled.div`
  /* TODO 반응형 구현시 바꾸어야 할 부분 */
  height: 140px;
  width: var(--inner-width);

  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 30px;
  margin-bottom: 30px;
`;

const StProfilePicture = styled.img`
  border-radius: 50%;
  height: 100%;
  width: auto;
  aspect-ratio: 1/1;
`;

const StProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  margin-left: 40px;
`;

const StH1 = styled.p`
  font-size: 30px;
`;

const StUserEmail = styled.p`
  font-size: 15px;
  color: var(--color-gray2);
`;

export default React.memo(ProfileContainer);
