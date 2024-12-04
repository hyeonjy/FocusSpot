import { searchAllResults } from '../api/map';
import { useQuery } from '@tanstack/react-query';

const useSearch = (map, activeFilter, currentLocation, searchWord) => {
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

  const keywords = getSearchKeywords(); // 검색 키워드 갖고오기

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['search', activeFilter, searchWord],
    queryFn: async () => {
      try {
        return await searchAllResults(map, currentLocation, keywords, searchWord);
      } catch (err) {
        console.log('errr message: ', err.message);
        throw new err();
      }
    },
    retry: false,
    enabled: !!map && !!currentLocation
  });

  return { data, isPending, isError, error };
};

export default useSearch;
