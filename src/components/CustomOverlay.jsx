import React from 'react';
import { CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

const CustomOverlay = ({ place, index, overlayIndex, setOverlayIndex }) => {
  return (
    <>
      <MapMarker
        position={{ lat: place.y, lng: place.x }}
        title={place.place_name}
        onClick={() => setOverlayIndex(index)}
      />

      {overlayIndex === index && (
        <CustomOverlayMap position={{ lat: place.y, lng: place.x }} xAnchor={0.5} yAnchor={1.5}>
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
        </CustomOverlayMap>
      )}
    </>
  );
};

export default CustomOverlay;

const StCustomOverlayWrap = styled.div`
  position: relative;
  background-color: white;
  border-radius: 6px;
  padding: 15px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  width: 270px;
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
  margin-bottom: 10px;
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

  &:hover {
    color: #dddddd;
  }
`;

const StAddress = styled.div`
  margin-top: 5px;
`;

const StLink = styled.a`
  color: #007bff;
  text-decoration: none;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }
`;
