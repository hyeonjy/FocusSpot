import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchSidebar from '../components/SearchSidebar';
import AddressList from '../components/AddressList';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import Search from '../components/Search';
import useSearch from '../hooks/useSearch';
import { getAddressByCoordinates } from '../api/map';
import useCurrentLocation from '../hooks/useCurrentLocation';

const Maps = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchWord, setSearchWord] = useState(''); // 장소 검색 단어
  const [map, setMap] = useState();
  const [addresses, setAddresses] = useState([]); // 지도에서 보고 있는 위치 표시 ex) 부산 > 해운대구 > 우동
  const currentLocation = useCurrentLocation(); // 초기 현재 위치
  const [activeFilter, setActiveFiler] = useState(searchParams.get('filter') || '전체'); // URL에서 filter 가져오기
  const { markers, places } = useSearch(map, activeFilter, currentLocation, searchWord); // 검색한 위치정보들과 마커정보들

  useEffect(() => {
    // 현재 보고 있는 지도 위치 표시 업데이트 ex) 부산 > 수영구 > 망미동
    if (places.length > 0) {
      const filterAddress = places[0].address_name.split(' ').slice(0, 3);
      setAddresses(filterAddress);
    }
  }, [places]);

  // 필터 버튼 클릭 핸들러
  const handleFilterClick = (filter) => {
    setSearchParams({ filter }); // URL 쿼리 파라미터 업데이트
    setActiveFiler(filter);
    setSearchWord(''); // 검색어 초기화
  };

  // 검색 제출 핸들러
  const handleSearchSubmit = (word) => {
    setSearchWord(word);
    setActiveFiler(word);
    setSearchParams({ filter: word }); // 필터 초기화
  };

  // 지도 드래그 endpoint로 지도 위치 표시 업데이트 핸들러
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
          <CustomOverlayMap key={`${marker.title}-${index}`} position={marker.position}>
            <button title={marker.title}>
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
              />
            </button>
          </CustomOverlayMap>
        ))}
      </Map>
      <Search activeFilter={activeFilter} handleFilterClick={handleFilterClick} onSearchSubmit={handleSearchSubmit} />
      <AddressList addresses={addresses} />
      <SearchSidebar searchWord={searchWord} places={places} activeFilter={activeFilter} />
    </>
  );
};

export default Maps;
