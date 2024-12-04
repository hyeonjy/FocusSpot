import React, { useState } from 'react';
import styled from 'styled-components';
import InputText from '../common/InputText';
import Button from '../common/Button';
import ImageUpload from '../common/ImageUpload';
import { useUserStore } from '../../zustand/userStore';
import Swal from 'sweetalert2';
import { updateUserProfile, uploadProfileImgToStore } from '../../api/supabaseSignin';

const EditForm = () => {
  const { name, email, setName, setProfileImg } = useUserStore();
  const [userName, setUserName] = useState(name); // 인풋 창 보여주기용

  const handleProfileUpdate = async (e) => {
    try {
      // submit 새로고침 방지
      e.preventDefault();

      // 이미지 DB에 저장 로직
      const file = e.target.profileImg.files[0];
      let imgStoragePath = null;

      // 존재하는 파일인지 확인
      if (file) {
        imgStoragePath = await uploadProfileImgToStore(email, file);
      }

      // 유저 프로파일 업데이트
      const updatedUser = await updateUserProfile(userName, email, imgStoragePath);

      // zustand에 업데이트
      setName(updatedUser.name);
      setProfileImg(updatedUser.profile_picture);

      // 성공 알림
      Swal.fire({
        text: '프로필이 성공적으로 수정되었습니다.',
        icon: 'success',
        iconColor: 'var(--color-primary)',
        confirmButtonText: 'OK',
        confirmButtonColor: 'var(--color-primary)'
      });
    } catch (error) {
      console.log(`회원 정보 수정 에러 Error: ${error}`);
      Swal.fire({
        text: '프로필 수정에 실패했습니다. 다시 시도해주세요.',
        icon: 'error',
        iconColor: 'var(--color-primary)'
      });
    }
  };

  return (
    <>
      <StH2>프로필 수정</StH2>
      <StForm onSubmit={handleProfileUpdate}>
        <StEditFormLeft>
          <li>
            <ImageUpload />
          </li>
          <li>
            <StInputTitle>
              이름 <StRed>*</StRed>
            </StInputTitle>
            <InputText
              placeholderText="이름을 입력해주세요"
              value={userName}
              handleChange={(e) => setUserName(e.target.value)}
            />
          </li>
        </StEditFormLeft>
        <Button size="big" color="primary" fill={true} label="수정 완료" type={'submit'} />
      </StForm>
    </>
  );
};

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
  justify-content: space-between;
  padding-bottom: 30px;
  ul {
    width: 47%;
  }
`;

const StEditFormLeft = styled.ul`
  justify-self: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-height: 313px;
  margin: 0 auto;
  li {
    margin: 20px 0;
  }
`;

const StInputTitle = styled.p`
  padding-left: 10px;
  font-size: 15px;
`;

const StRed = styled.span`
  color: var(--color-red);
`;

export default EditForm;
