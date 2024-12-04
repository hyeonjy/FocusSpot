import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addBookmark } from '../api/bookmark';

const useAddBookmark = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemData }) => addBookmark(itemData, userId),
    onSuccess: () => queryClient.invalidateQueries(['bookmarks', userId]),
    onError: (error) => {
      console.error('[useAddBookmark] Error:', error);
      // TODO: 알림창 띄우기
    }
  });
};

export default useAddBookmark;
