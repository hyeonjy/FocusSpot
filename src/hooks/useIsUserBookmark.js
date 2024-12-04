import { useQuery } from '@tanstack/react-query';
import { isUserBookmark } from '../api/bookmark';

const useIsUserBookmark = (itemDataId, userId, isAuthenticated) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['isUserBookmark', itemDataId, userId],
    queryFn: () => isUserBookmark(itemDataId, userId),
    enabled: !!itemDataId && !!userId && isAuthenticated
  });

  return {
    isBookmarked: data ?? false,
    isPending,
    isError
  };
};

export default useIsUserBookmark;
