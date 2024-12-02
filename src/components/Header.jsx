import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  const [isLogin, setIsLogin] = useState(false); // 임시 auth state

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
            {isLogin ? (
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
`;

const StNav = styled.nav`
  ul {
    display: flex;
    gap: 50px;
  }
`;

export default Header;
