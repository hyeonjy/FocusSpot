import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addBookmark } from '../api/bookmark';
import Swal from 'sweetalert2';


const useAddBookmark = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemData }) => addBookmark(itemData, userId),
    onSuccess: () => {
      queryClient.invalidateQueries(['bookmarks', userId]);
      Swal.fire({
        icon: 'success',
        iconColor: 'var(--color-primary)',
        title: '북마크 추가 완료',
        text: '북마크를 성공적으로 추가했습니다',
        confirmButtonText: 'OK',
        confirmButtonColor: 'var(--color-primary)'
      });
    },
    onError: (error) => {
      console.error('[useAddBookmark] Error:', error);
      // TODO: 알림창 띄우기
    }
  });
};

export default useAddBookmark;
