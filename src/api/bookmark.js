import supabase from './superbaseClient';

// 특정 유저의 북마크 모두 가져오기
export const getBookmarkByUserId = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('bookmarks')
      .select(`spot_id, spots(id, phone, place_name, x, y, address_name, category_name, road_address_name, place_url)`)
      .eq('user_id', userId);
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// TODO: 주변 카페 찾기 (later with map api)
// TODO: 주변 도서관 찾기 (later with map api)

// 가장 많이 북마크 된 spots 가져오기
// 우선 최대 10개로 제한
export const getMostBookmarkedSpots = async (limit = 10) => {
  try {
    const { data, error } = await supabase
      .from('bookmarks')
      .select(`spot_id, spots(id, name, latitude, longitude, address, category), count:count(*)`)
      .group(`spot_id, spots.id`) // bookmarks 테이블의 spot_id라는 column과 spots 테이블의 id 비교해서 grouping
      .order('count', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 북마크 추가하기
// x-위도 (latitude)
// y-경도 (longitude)
export const addBookmark = async (itemData) => {
  // 스팟에도 추가
  // 북마크에도 유저 정보 이용해서 추가
  try {
    const { data, error } = await supabase.from('bookmarks').insert([]).select();
    if (error) throw error;
    return { success: true, error };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
