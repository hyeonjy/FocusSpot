import styled from 'styled-components';

const Container = styled.li`
  position: relative;
  button {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Category = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: var(--color-gray4);
  margin-bottom: 13px;
`;

const Address = styled.p`
  font-size: 13px;
  color: var(--color-gray2);
  p + & {
    margin-top: 4px;
  }
`;

const Phone = styled.p`
  font-size: 13px;
  font-weight: 300;
  color: var(--color-gray2);
  margin-top: 16px;
`;

const ListItem = ({ handleClick }) => {
  return (
    <Container>
      <button onClick={handleClick}></button>
      <Title>런앤런스터디카페 부개점</Title>
      <Category>스터디카페,스터디룸</Category>
      <Address>인천 부평구 길주남로 129 한아름프라자 4층 401, 402호 (우)21351</Address>
      <Address>(지번) 부개동 12-126</Address>
      <Phone>010-2549-3854</Phone>
    </Container>
  );
};

export default ListItem;
