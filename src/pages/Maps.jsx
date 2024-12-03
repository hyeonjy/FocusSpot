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
  const [searchWord, setSearchWord] = useState('');
  const [map, setMap] = useState();
  const [addresses, setAddresses] = useState([]);
  const currentLocation = useCurrentLocation(); // 초기 현재 위치
  const activeFilter = searchParams.get('filter') || '전체'; // URL에서 filter 가져오기
  const { markers, places } = useSearch(map, activeFilter, currentLocation, searchWord);

  useEffect(() => {
    if (places.length > 0) {
      const filterAddress = places[0].address_name.split(' ').slice(0, 3);
      setAddresses(filterAddress);
    }
  }, [places]);

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
            <button>
              <img
                src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png"
                style={{
                  width: '36px',
                  height: '691px',
                  clip: `rect(${(index + 1) * 10}px, 36px, 46px, 0px)`,
                  position: 'absolute',
                  top: `-35px`,
                  left: '-13px'
                }}
              />
            </button>
          </CustomOverlayMap>
        ))}
        {/* {markers.map((marker, index) => (
          <CustomOverlayMap key={`${marker.title}-${index}`} position={marker.position}>
            <button>
              <img
                src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png"
                style={{
                  width: '36px',
                  height: '691px',
                  clip: `rect(56px, 36px, 93px, 0px)`,
                  position: 'absolute',
                  top: `-81px`,
                  left: '-13px'
                }}
              />
            </button>
          </CustomOverlayMap>
        ))} */}
        {/* {markers.map((marker, index) => (
          <CustomOverlayMap key={`${marker.title}-${index}`} position={marker.position}>
            <button>
              <img
                src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png"
                style={{
                  width: '36px',
                  height: '691px',
                  clip: `rect(102px, 36px, 139px, 0px)`,
                  position: 'absolute',
                  top: `-81px`,
                  left: '-13px'
                }}
              />
            </button>
          </CustomOverlayMap>
        ))} */}
      </Map>
      <Search activeFilter={activeFilter} handleFilterClick={handleFilterClick} onSearchSubmit={handleSearchSubmit} />
      <AddressList addresses={addresses} />
      <SearchSidebar searchWord={searchWord} places={places} activeFilter={activeFilter} />
    </>
  );
};

export default Maps;
