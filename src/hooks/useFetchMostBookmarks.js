import { useQuery } from '@tanstack/react-query';
import { getMostBookmarkedSpots } from '../api/bookmark';

const useFetchMostBookmarks = (limit) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['bookmarks', limit],
    queryFn: () => getMostBookmarkedSpots(limit)
  });

  return {
    bookmarks: data || [],
    isPending,
    isError
  };
};

export default useFetchMostBookmarks;
