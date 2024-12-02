import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SearchModal = ({ place, activeFilter, onClose }) => {
  if (!place) return null;

  return (
    <StModalOverlay>
      <StModal>
        <header>
          <StModalCategory>{place.category_name.split('>').pop().trim()}</StModalCategory>
          <h1>{place.place_name}</h1>
        </header>
        <main>
          <h1>상세정보</h1>
          <p>
            <img src="/map.svg" />
            {place.address_name}
          </p>
          <Link to={place.place_url}>
            <p>
              <img src="/home.svg" />
              {place.place_url}
            </p>
          </Link>
          <p>
            <img src="/phone.svg" />
            {place.phone || '전화번호 없음'}
          </p>
          <p>
            {' '}
            <img src="/net.svg" />#{activeFilter}
          </p>
        </main>
        <StButtonBox>
          <StTackButton>
            <img src="/tack.svg" />
          </StTackButton>
          <StCloseButton onClick={onClose}>X</StCloseButton>
        </StButtonBox>
      </StModal>
    </StModalOverlay>
  );
};

export default SearchModal;

const StModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 12;
`;

const StModal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  /* text-align: center; */
  position: relative;

  h1 {
    font-size: 30px;
    font-weight: 400;
  }

  main {
    padding-top: 20px;
  }

  main > h1 {
    font-size: 20px;
    font-weight: 800;
  }

  main > p {
    margin-top: 15px;
    display: flex;
    align-items: center;
  }

  main > p:last-child {
    color: #007aff;
  }

  p > img {
    margin-right: 10px;
  }

  a {
    display: block;
    margin-top: 15px;
    color: #007aff;
  }
`;

const StModalCategory = styled.span`
  color: #999999;
  font-size: 20px;
  margin-bottom: 10px;
`;

const StButtonBox = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  align-items: center;
`;

const StTackButton = styled.div`
  border: 1px solid #00115e;
  border-radius: 3px;
  margin-right: 12px;
  padding: 4px;
  cursor: pointer;
  &:hover {
    background-color: #dddddd;
  }
`;

const StCloseButton = styled.div`
  cursor: pointer;
  font-size: 25px;
  &:hover {
    color: #dddddd;
  }
`;
