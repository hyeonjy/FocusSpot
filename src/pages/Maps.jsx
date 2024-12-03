import React, { useEffect, useState } from 'react';
import SearchSidebar from '../components/SearchSidebar';
import AddressList from '../components/AddressList';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Search from '../components/Search';
import useCurrentLocation from '../hooks/useCurrentLocation';
import useSearch from '../hooks/useSearch';
import { getAddressByCoordinates } from '../api/map';

const Maps = () => {
  const [searchWord, setSearchWord] = useState('');
  const [activeFilter, setActiveFilter] = useState('전체'); // 장소 카테고리 필터
  const [map, setMap] = useState();
  const [addresses, setAddresses] = useState([]);
  const currentLocation = useCurrentLocation(); // 초기 현재 위치
  const { markers, places } = useSearch(map, activeFilter, currentLocation, searchWord);

  useEffect(() => {
    if (places.length > 0) {
      const filterAddress = places[0].address_name.split(' ').slice(0, 3);
      setAddresses(filterAddress);
    }
  }, [places]);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setSearchWord('');
  };

  const handleSearchSubmit = (word) => {
    setSearchWord(word);
    setActiveFilter('');
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
        style={{
          width: '100%',
          height: '100vh'
        }}
        level={3}
        onCreate={setMap}
        onDragEnd={handleDrag}
      >
        {markers.map((marker, index) => (
          <MapMarker
            key={`${marker.title}-${index}`}
            position={marker.position}
            image={{
              src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
              size: {
                width: 24,
                height: 35
              }
            }}
            title={marker.title}
          />
        ))}
      </Map>
      <Search activeFilter={activeFilter} handleFilterClick={handleFilterClick} onSearchSubmit={handleSearchSubmit} />
      <AddressList addresses={addresses} />
      <SearchSidebar places={places} activeFilter={activeFilter} />
    </>
  );
};

export default Maps;
