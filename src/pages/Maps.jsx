import React, { useEffect, useState } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useSearchParams } from 'react-router-dom';
import SearchSidebar from '../components/SearchSidebar';
import AddressList from '../components/AddressList';
import Search from '../components/Search';
import useSearch from '../hooks/useSearch';
import { getAddressByCoordinates } from '../api/map';
import useCurrentLocation from '../hooks/useCurrentLocation';
import styled from 'styled-components';

const Maps = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchWord, setSearchWord] = useState('');
  const [map, setMap] = useState();
  const [addresses, setAddresses] = useState([]);
  const currentLocation = useCurrentLocation();
  const [activeFilter, setActiveFiler] = useState(searchParams.get('filter') || '전체');
  const { markers, places } = useSearch(map, activeFilter, currentLocation, searchWord);
  const [overlayIndex, setOverlayIndex] = useState(null);

  useEffect(() => {
    if (places.length > 0) {
      const filterAddress = places[0].address_name.split(' ').slice(0, 3);
      setAddresses(filterAddress);
    }
  }, [places]);

  const handleFilterClick = (filter) => {
    setSearchParams({ filter });
    setActiveFiler(filter);
    setSearchWord('');
    setOverlayIndex(null);
  };

  const handleSearchSubmit = (word) => {
    setSearchWord(word);
    setActiveFiler(word);
    setSearchParams({ filter: word });
    setOverlayIndex(null);
  };

  const handleDrag = async () => {
    const newCenter = map.getCenter();
    const newLat = newCenter.getLat();
    const newLng = newCenter.getLng();
    const updatedAddresses = await getAddressByCoordinates(newLat, newLng);
    setAddresses(updatedAddresses);
  };

  console.log('places: ', places);
  console.log('markers: ', markers);

  return (
    <>
      <Map
        center={currentLocation.center}
        style={{ width: '100%', height: '100vh' }}
        level={3}
        onCreate={setMap}
        onDragEnd={handleDrag}
      >
        <MapMarker
          image={{
            src: '/dot.svg',
            size: {
              width: 40,
              height: 40
            }
          }}
          position={currentLocation.center}
          title="현재 위치"
        />

        {places.map((place, index) => (
          <React.Fragment key={`${place.place_name}-${index}`}>
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
          </React.Fragment>
        ))}
      </Map>
      <Search activeFilter={activeFilter} handleFilterClick={handleFilterClick} onSearchSubmit={handleSearchSubmit} />
      <AddressList addresses={addresses} />
      <SearchSidebar searchWord={searchWord} places={places} activeFilter={activeFilter} />
    </>
  );
};

export default Maps;

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
