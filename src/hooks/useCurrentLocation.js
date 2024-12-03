import { useState, useEffect } from 'react';

const defaultCenter = { lat: 33.450701, lng: 126.570667 };

const useCurrentLocation = () => {
  const [location, setLocation] = useState({
    center: defaultCenter,
    errMsg: null,
    isLoading: true
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({
        center: defaultCenter,
        errMsg: 'Geolocation을 사용할 수 없습니다.',
        isLoading: false
      });
      return;
    }

    // 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) =>
        setLocation({
          center: { lat: latitude, lng: longitude },
          errMsg: null,
          isLoading: false
        }),
      () => {
        alert('위치정보 가져오기 실패: 위치 권한을 켜주세요.');
        setLocation({
          center: defaultCenter,
          errMsg: '위치 정보를 가져올 수 없습니다. 권한을 허용해주세요.',
          isLoading: false
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000
      }
    );

    // 위치 변경 감지
    const watchId = navigator.geolocation.watchPosition(
      ({ coords: { latitude, longitude } }) => {
        console.log(latitude, longitude);
        setLocation({
          center: { lat: latitude, lng: longitude },
          errMsg: null,
          isLoading: false
        });
      },
      () => {
        alert('위치 정보 갱신 실패');
        setLocation({
          center: defaultCenter,
          errMsg: '위치 정보를 갱신할 수 없습니다.',
          isLoading: false
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000
      }
    );

    // 컴포넌트 언마운트 시 위치 감지 종료
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return location;
};

export default useCurrentLocation;
