export const getAddressByCoordinates = async (lat, lng) => {
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

export const createSearchPromises = (currentLocation, keywords, searchWord) => {
  const ps = new kakao.maps.services.Places();
  const currentLatLng = new kakao.maps.LatLng(currentLocation.center.lat, currentLocation.center.lng);

  return keywords.map((keyword) => {
    return new Promise((resolve) => {
      const options = searchWord ? {} : { location: currentLatLng, radius: 1000 };

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

export const searchAllResults = (map, results) => {
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
  map.setBounds(bounds); // 지도 반경 설정(기본은 1km)
  return { allPlaces, newMarkers };
};
