import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

const KAKAOMAP_API_KEY = import.meta.env.VITE_KAKAOMAP_KEY;

const useKakaoLoader = () => {
  const [loading, error] = useKakaoLoaderOrigin({
    appkey: `${KAKAOMAP_API_KEY}`,
    libraries: ['clusterer', 'drawing', 'services']
  });

  return { loading, error };
};

export default useKakaoLoader;
