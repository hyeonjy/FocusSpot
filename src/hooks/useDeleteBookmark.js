import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBookmark } from '../api/bookmark';

const useDeleteBookmark = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (spotId) => deleteBookmark(spotId, userId),
    onSuccess: () => queryClient.invalidateQueries(['bookmarks', userId]),
    onError: (error) => {
      console.error('[useDeleteBookmark] Error:', error);
      // TODO: 유저에게 알림창 띄우기
    }
  });
};

export default useDeleteBookmark;
