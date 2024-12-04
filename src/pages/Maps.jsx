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
import CustomOverlay from '../components/CustomOverlay';

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
          <CustomOverlay
            key={`${place.place_name}-${index}`}
            place={place}
            index={index}
            overlayIndex={overlayIndex}
            setOverlayIndex={setOverlayIndex}
          />
        ))}
      </Map>
      <Search activeFilter={activeFilter} handleFilterClick={handleFilterClick} onSearchSubmit={handleSearchSubmit} />
      <AddressList addresses={addresses} />
      <SearchSidebar searchWord={searchWord} places={places} activeFilter={activeFilter} />
    </>
  );
};

export default Maps;
