import { useQuery } from '@tanstack/react-query';
import { getBookmarkByUserId } from '../api/bookmark';

const useFetchUserBookmarks = (userId) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['bookmarks', userId],
    queryFn: () => getBookmarkByUserId(userId),
    enabled: !!userId, // 아이디 확인!
    retry: 2 
  });

  return {
    bookmarks: data || [],
    isPending,
    isError
  };
};

export default useFetchUserBookmarks;
