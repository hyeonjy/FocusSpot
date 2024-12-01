import { useEffect, useState } from 'react';
import { getBookmarkByUserId } from '../api/bookmark';

const useFetchUserBookmarks = (userId) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 유저 아이디 제공 안되어있을때
    if (!userId) return;

    const fetchBookmarks = async () => {
      try {
        setLoading(true);
        const data = await getBookmarkByUserId(userId);
        setBookmarks(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [userId]);

  return { bookmarks, loading, error };
};

export default useFetchUserBookmarks;
