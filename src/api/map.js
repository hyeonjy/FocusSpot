export const getAddressByCoordinates = async (lat, lng) => {
  const kakao = window.kakao;
  const geocoder = new kakao.maps.services.Geocoder();

  return new Promise((resolve) => {
    geocoder.coord2Address(lng, lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const address = result[0].address.address_name || '';
        resolve(address.split(' ').slice(0, 3));
      } else {
        resolve([]);
      }
    });
  });
};

export const searchAllResults = async (map, currentLocation, keywords, searchWord) => {
  const kakao = window.kakao;
  const ps = new kakao.maps.services.Places();
  const currentLatLng = new kakao.maps.LatLng(currentLocation.center.lat, currentLocation.center.lng); // LatLng 객체 생성

  // 검색 Promise 생성
  const promises = keywords.map((keyword) => {
    return new Promise((resolve) => {
      // 검색 옵션 => searchWord면 국내 모두 검색, filter클릭시엔 반경 3km에서 검색
      const options = searchWord ? {} : { location: currentLatLng, radius: 3000 };

      ps.keywordSearch(
        keyword,
        (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            resolve(data); // 검색된 장소 데이터를 resolve
          } else {
            reject([]);
          }
        },
        options
      );
    });
  });

  // 모든 검색 결과 처리
  const results = await Promise.all(promises);
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

  map.setBounds(bounds); // 지도 반경 설정
  return { allPlaces, newMarkers }; // 결과 반환
};
