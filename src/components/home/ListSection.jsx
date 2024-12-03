import styled from 'styled-components';
import theme from '../../styles/theme';
import CarouselList from '../CarouselList';
import ListItem from '../ListItem';

const ListSection = ({ title, listData }) => {
  return (
    <StListSection>
      <StInner>
        <StH3>{title}</StH3>
        <StList>
          <CarouselList>
            {listData.map((data) => {
              return <ListItem key={data.spot_id} itemData={data.spots} />;
            })}
          </CarouselList>
        </StList>
      </StInner>
    </StListSection>
  );
};

const StListSection = styled.section`
  margin-top: 100px;
`;

const StInner = styled.div`
  width: var(--inner-width);
  margin: 0 auto;
  @media ${theme.device.tablet} {
    width: 75%;
  }
`;

const StH3 = styled.h3`
  font-size: 30px;
  font-weight: 500;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  @media ${theme.device.tablet} {
    font-size: 20px;
    padding-bottom: 15px;
  }
`;

const StList = styled.div`
  .slick-list {
    padding: 40px 0 10px;
    margin: 0 -14px;
  }
  .slick-track {
    display: flex;
  }
  .slick-slide {
    background: var(--color-white);
    border: var(--color-gray6) 1px solid;
    margin: 0 14px;
    padding: 35px 40px 35px 20px;
    transition: transform 0.2s, box-shadow 0.2s;
    &:hover {
      border: var(--color-primary) 1px solid;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px;
      transform: translateY(-7px);
    }
  }

  .slick-prev {
    left: -40px !important;
  }
  .slick-next {
    right: -40px !important;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 30px;
    color: var(--color-primary);
  }
  .slick-prev:before {
    content: '❮';
  }
  .slick-next:before {
    content: '❯';
  }
`;

export default ListSection;
