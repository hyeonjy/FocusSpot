import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

const ProfileContainer = ({ openModal }) => {
  // TODO: 유저 정보 zustand에서 가져오는 부분 필요
  return (
    <StProfileSection>
      <StProfilePicture alt={'profile image'} src={'https://www.w3schools.com/css/paris.jpg'} />
      <StProfileDetails>
        <StH1>김철수!</StH1>
        <StUserEmail>test1234@naver.com</StUserEmail>
        <Button size="small" color="primary" fill={false} label="프로필 수정" handleClick={openModal} />
      </StProfileDetails>
    </StProfileSection>
  );
};

const StProfileSection = styled.div`
  /* TODO 반응형 구현시 바꾸어야 할 부분 */
  height: 140px;
  width: 1280px;

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
