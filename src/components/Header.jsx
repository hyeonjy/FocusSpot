import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../styles/theme';
import { useUserStore } from '../zustand/userStore';

const Header = () => {
  const { isAuthenticated } = useUserStore();

  return (
    <StHeader>
      <StInner>
        <StH1>
          <Link to="/">
            <img src="/logo.svg" alt="" />
          </Link>
        </StH1>

        <StNav>
          <ul>
            <li>
              <Link to="/map">지도보기</Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/bookmark">마이페이지</Link>
                </li>
                <li>
                  <button type="button">로그아웃</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">로그인</Link>
                </li>
              </>
            )}
          </ul>
        </StNav>
      </StInner>
    </StHeader>
  );
};

const StHeader = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100px;
  background: var(--color-white);
  z-index: 999;
  border-bottom: 1px solid #eee;
  @media ${theme.device.laptop} {
    height: 80px;
  }
  @media ${theme.device.mobile} {
    height: 60px;
  }
`;

const StInner = styled.div`
  width: var(--inner-width);
  height: inherit;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StH1 = styled.h1`
  width: 232px;
  img {
    max-width: 100%;
  }
  @media ${theme.device.laptop} {
    width: 190px;
  }
  @media ${theme.device.tablet} {
    width: 160px;
  }
  @media ${theme.device.mobile} {
    width: 140px;
  }
`;

const StNav = styled.nav`
  ul {
    display: flex;
    gap: 50px;
    @media ${theme.device.mobile} {
      gap: 20px;
      font-size: 14px;
    }
  }
`;

export default Header;
