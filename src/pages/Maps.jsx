import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchSidebar from '../components/SearchSidebar';
import AddressList from '../components/AddressList';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Search from '../components/Search';
import useSearch from '../hooks/useSearch';
import useCurrentLocation from '../hooks/useCurrentLocation';

const Maps = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchWord, setSearchWord] = useState('');
  const [map, setMap] = useState();
  const currentLocation = useCurrentLocation(); // 초기 현재 위치

  // URL에서 filter 가져오기
  const activeFilter = searchParams.get('filter') || '전체';

  const { markers, places } = useSearch(map, activeFilter, currentLocation, searchWord);
  const addresses = ['경기도', '부천시 원미구', '상2동']; // NOTE: 임시 현재 주소 데이터

  // 필터 버튼 클릭 핸들러
  const handleFilterClick = (filter) => {
    setSearchParams({ filter }); // URL 쿼리 파라미터 업데이트
    setSearchWord(''); // 검색어 초기화
  };

  // 검색 제출 핸들러
  const handleSearchSubmit = (word) => {
    setSearchWord(word);
    setSearchParams({ filter: word }); // 필터 초기화
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
