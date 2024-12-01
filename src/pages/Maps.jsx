import React from 'react';
import useKakaoLoader from '../hooks/useKakaoLoader';
import SearchSidebar from '../components/SearchSidebar';
import { Map } from 'react-kakao-maps-sdk';

const Maps = () => {
  const { loading, error } = useKakaoLoader();

  if (loading) {
    // NOTE : 로딩바? 만들지..?
    return <p>지도를 로드 중입니다...</p>;
  }

  if (error) {
    return <p>지도를 로드하는 데 실패했습니다: {error.message}</p>;
  }

  return (
    <>
      <Map
        center={{
          lat: 33.450701, // NOTE : 임시 위치 수정 필요
          lng: 126.570667 // NOTE : 임시 위치 수정 필요
        }}
        style={{
          width: '100%',
          height: '100vh'
        }}
        level={3}
      />
      <SearchSidebar />
    </>
  );
};

export default Maps;
