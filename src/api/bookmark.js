import supabase from './superbaseClient';

// 특정 유저의 북마크 모두 가져오기
export const getBookmarkByUserId = async (userId) => {
  try {
    const { data, error } = await supabase.from('bookmarks').select('user_id', 'spot_id').eq('user_id', userId);
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
