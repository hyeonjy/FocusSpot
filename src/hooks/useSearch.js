import { useEffect, useState } from 'react';

const useSearch = (map, activeFilter, currentLocation, searchWord) => {
  const [markers, setMarkers] = useState([]);
  const [places, setPlaces] = useState([]); // 장소 검색 결과를 저장하는 배열

  const getSearchKeywords = () => {
    if (searchWord) {
      return [searchWord];
    }
    if (activeFilter == '전체') {
      return ['스터디카페', '카페', '도서관'];
    }
    return [activeFilter];
  };

  const createSearchPromises = (keywords) => {
    const kakao = window.kakao;

    const ps = new kakao.maps.services.Places();
    const currentLatLng = new kakao.maps.LatLng(currentLocation.center.lat, currentLocation.center.lng);

    return keywords.map((keyword) => {
      return new Promise((resolve) => {
        const options = searchWord ? {} : { location: currentLatLng, radius: 5000 };

        ps.keywordSearch(
          keyword,
          (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
              resolve(data); // 검색된 장소 데이터를 resolve
            } else {
              resolve([]); // 결과가 없으면 빈 배열 반환
            }
          },
          options
        );
      });
    });
  };

  const handleSearchResults = (results) => {
    const kakao = window.kakao;

    const allPlaces = results.flat(); // 각 카테고리별 검색 결과를 합침
    const bounds = new kakao.maps.LatLngBounds(); // 지도 범위 설정

    const newMarkers = allPlaces.map((place) => {
      const position = new kakao.maps.LatLng(place.y, place.x);
      bounds.extend(position);

      return {
        position: {
          lat: place.y,
          lng: place.x
        },
        title: place.place_name // 장소 이름을 마커의 타이틀로 설정
      };
    });

    setPlaces(allPlaces);
    setMarkers(newMarkers); // 마커들 업데이트
    map.setBounds(bounds); // 지도 반경 설정(기본은 5km)
  };

  useEffect(() => {
    if (!map || !currentLocation) return;

    const keywords = getSearchKeywords(); // 검색 키워드 갖고오기
    const promises = createSearchPromises(keywords); // 검색 Promise 생성
    Promise.all(promises).then((results) => handleSearchResults(results)); // 모두 검색하고 마커 데이터를 설정
  }, [currentLocation, activeFilter, searchWord]);

  return { markers, places };
};

export default useSearch;
