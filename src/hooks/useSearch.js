import { useEffect, useState } from 'react';
import { createSearchPromises, searchAllResults } from '../api/map';

const useSearch = (map, activeFilter, currentLocation, searchWord) => {
  const [markers, setMarkers] = useState([]);
  const [places, setPlaces] = useState([]); // 장소 검색 결과를 저장하는 배열

  const getSearchKeywords = () => {
    // 검색단어를 입력한 경우
    if (searchWord) {
      return [searchWord];
    }
    // 필터링을 사용한 경우
    if (activeFilter == '전체') {
      return ['스터디카페', '카페', '도서관'];
    }
    return [activeFilter];
  };

  useEffect(() => {
    if (!map || !currentLocation) return;

    const keywords = getSearchKeywords(); // 검색 키워드 갖고오기
    const promises = createSearchPromises(currentLocation, keywords, searchWord); // 검색 Promise 생성

    Promise.all(promises)
      .then((results) => {
        const { allPlaces, newMarkers } = searchAllResults(map, results);
        setPlaces(allPlaces);
        setMarkers(newMarkers);
      })
      .catch(() => {
        // Promise.all 자체가 reject로 빠지는 경우
        setPlaces([]);
        setMarkers([]);
      });
  }, [currentLocation, activeFilter]);

  return { markers, places };
};

export default useSearch;
