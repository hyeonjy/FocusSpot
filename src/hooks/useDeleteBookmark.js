import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addBookmark } from '../api/bookmark';

const useDeleteBookmark = (userId) => {
  const queryClient = useQueryClient();

  // TODO: 낙관적 업데이트 변경 필요
  return useMutation({
    mutationFn: (spotId) => addBookmark(spotId, userId),
    onSuccess: () => queryClient.invalidateQueries(['bookmarks', userId])
  });
};

export default useDeleteBookmark;
