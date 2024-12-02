import styled from 'styled-components';

const ListItem = ({ handleClick, itemData }) => {
  console.log("ListItem =>", itemData);

  // TODO: 주소 분리하는 로직 필요
  const streetAddress = itemData.address.split("\n");
  return (
    <StContainer>
      <button onClick={handleClick}></button>
      <StTitle>{itemData.name}</StTitle>
      <StCategory>스터디카페,스터디룸</StCategory>
      <StAddress>{streetAddress[0]}</StAddress>
      <StAddress>{streetAddress[1]}</StAddress>
      <StPhone>010-2549-3854</StPhone>
    </StContainer>
  );
};

const StContainer = styled.li`
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

const StTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const StCategory = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: var(--color-gray4);
  margin-bottom: 13px;
`;

const StAddress = styled.p`
  font-size: 13px;
  color: var(--color-gray2);
  p + & {
    margin-top: 4px;
  }
`;

const StPhone = styled.p`
  font-size: 13px;
  font-weight: 300;
  color: var(--color-gray2);
  margin-top: 16px;
`;

export default ListItem;
