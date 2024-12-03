import { useEffect, useState } from 'react';

const useSearchCategories = (map, activeFilter, currentLocation) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (!map || !currentLocation) return;

    const kakao = window.kakao;

    const ps = new kakao.maps.services.Places();
    const currentLatLng = new kakao.maps.LatLng(currentLocation.center.lat, currentLocation.center.lng);
    const keywords = activeFilter === '전체' ? ['스터디카페', '카페', '도서관'] : [activeFilter]; // 카테고리에 따라 검색할 키워드 설정

    const promises = keywords.map(
      (keyword) =>
        new Promise((resolve) => {
          ps.keywordSearch(
            keyword,
            (data, status) => {
              if (status === kakao.maps.services.Status.OK) {
                resolve(data); // 검색된 장소 데이터를 resolve
              } else {
                resolve([]); // 결과가 없으면 빈 배열
              }
            },
            { location: currentLatLng, radius: 5000 } // 현재 위치를 기준으로 5km 이내
          );
        })
    );

    // 모든 검색 결과를 병합하고 마커 데이터를 설정
    Promise.all(promises).then((results) => {
      const allPlaces = results.flat(); // 각 카테고리별 검색 결과를 합침
      const bounds = new kakao.maps.LatLngBounds(); // 지도 범위 설정을 위한 LatLngBounds 객체

      const newMarkers = allPlaces.map((place) => {
        const position = new kakao.maps.LatLng(place.y, place.x);
        bounds.extend(position); // LatLngBounds에 위치 추가

        return {
          position: {
            lat: place.y,
            lng: place.x
          },
          title: place.place_name // 장소 이름을 마커의 콘텐츠로 설정
        };
      });

      setMarkers(newMarkers); // 마커 상태 업데이트
      map.setBounds(bounds); // 지도 범위 설정
    });
  }, [currentLocation, activeFilter]);

  return markers;
};

export default useSearchCategories;
