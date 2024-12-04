import React from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

const CustomOverlay = ({ place, index, overlayIndex, setOverlayIndex }) => {
  return (
    <>
      <CustomOverlayMap zIndex={overlayIndex === index ? 1 : 0} position={{ lat: place.y, lng: place.x }}>
        <button title={place.place_name} onClick={() => setOverlayIndex(index)}>
          <img
            src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png"
            style={{
              width: '36px',
              height: '691px',
              clip: `rect(${10 + index * 46}px, 36px, ${10 + index * 46 + 36}px, 0px)`,
              position: 'absolute',
              top: `${-35 - index * 46}px`,
              left: '-13px'
            }}
            onClick={() => setOverlayIndex(index)}
          />
        </button>
        {overlayIndex === index && (
          <>
            <StCustomOverlayWrap>
              <StTriangle />
              <StHeader>
                <StTitle>{place.place_name}</StTitle>
                <StCloseButton onClick={() => setOverlayIndex(null)} title="닫기">
                  X
                </StCloseButton>
              </StHeader>
              <StAddress>
                <p>{place.road_address_name}</p>
                <p>(지번){place.address_name}</p>
                <StLink href={place.place_url}>홈페이지</StLink>
              </StAddress>
            </StCustomOverlayWrap>
          </>
        )}
      </CustomOverlayMap>
    </>
  );
};

export default CustomOverlay;

const StCustomOverlayWrap = styled.div`
  position: absolute;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  width: 300px;
  top: -177px;
  left: -150px;
  z-index: 9999999;
`;

const StTriangle = styled.div`
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid white;
`;

const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: var(--color-primary);
  color: white;
  height: 30px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  padding: 20px 10px;
`;

const StTitle = styled.span`
  font-weight: bold;
  font-size: 16px;
`;

const StCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: white;

  &:hover {
    color: tomato;
  }
`;

const StAddress = styled.div`
  margin-top: 5px;
  padding: 15px;

  p {
    margin-bottom: 5px;
  }

  p:nth-child(2) {
    color: #7d7d7d;
    font-size: 12px;
  }
`;

const StLink = styled.a`
  color: #007bff;
  text-decoration: none;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }
`;
