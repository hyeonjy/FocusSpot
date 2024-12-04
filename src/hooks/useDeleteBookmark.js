import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBookmark } from '../api/bookmark';
import Swal from 'sweetalert2';

const useDeleteBookmark = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (spotId) => deleteBookmark(spotId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries(['bookmarks', userId]);
      // Show SweetAlert notification for success
      Swal.fire({
        icon: 'info',
        iconColor: 'var(--color-primary)',
        title: '북마크 제거 완료',
        text: '북마크가 제거되었습니다',
        confirmButtonText: 'OK',
        confirmButtonColor: 'var(--color-primary)'
      });
    },
    onError: (error) => {
      console.error('[useDeleteBookmark] Error:', error);
      // TODO: 유저에게 알림창 띄우기
    }
  });
};

export default useDeleteBookmark;
