import supabase from './superbaseClient';

// 특정 유저의 북마크 모두 가져오기
// api에서 error throw시 사용하는 페이지단에서 trycatch가 하나 더 필요
export const getBookmarkByUserId = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('bookmarks')
      .select(`spot_id, spots(id, phone, place_name, x, y, address_name, category_name, road_address_name, place_url)`)
      .eq('user_id', userId);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('[FetchUserBookmark] Error ->', error);
    // return값으로 뱉어주는 혹은 error 메세지 나오게끔
    throw error;
  }
};

// 가장 많이 북마크 된 spots 가져오기
// 우선 최대 10개로 제한
export const getMostBookmarkedSpots = async (limit = 10) => {
  try {
    const { data, error } = await supabase
      .from('bookmarks')
      .select(`spot_id, spots(id, phone, place_name, x, y, address_name, category_name, road_address_name, place_url)`)
      .group(`spot_id, spots.id`) // bookmarks 테이블의 spot_id라는 column과 spots 테이블의 id 비교해서 grouping
      .order('count', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('[FetchMostBookmarks] Error ->', error);
    throw error;
  }
};

// 북마크 추가하기
export const addBookmark = async (itemData, userId) => {
  try {
    // spot에 저장 여부
    // DB에 존재하는 스팟이라면 (유저 중 누군가 이미 저장한 장소인 경우)
    // 저장 하지 않는다
    // 1. 장소가 DB에 존재하는 확인
    const { data: existingSpot, error: spotCheckError } = await supabase
      .from('spots')
      .select('id')
      .eq('id', itemData.id)
      .maybeSingle();
    // 주의: single()은 에러가 뜹니다

    if (spotCheckError && spotCheckError.code !== 'PGRST116') {
      // 일치하는 row가 없을 때 에러 코드 = 'PGRST116'
      // 즉 존재하지 않는 데이터 에러(장소를 새로 저장해야한다는 뜻) 외의 에러는 방지
      throw spotCheckError;
    }

    // 2. 장소가 DB에 존재하지 않는다면 새로 저장
    // kakao에서 제공하는 itemData 객체에서 필요한 데이터만 저장
    if (!existingSpot) {
      const { data: newSpot, error: spotInsertError } = await supabase
        .from('spots')
        .insert([
          {
            id: itemData.id,
            place_name: itemData.place_name,
            x: Number(itemData.x),
            y: Number(itemData.y),
            address_name: itemData.address_name,
            category_name: itemData.category_name,
            phone: itemData.phone,
            road_address_name: itemData.road_address_name,
            place_url: itemData.place_url
          }
        ])
        .select()
        .single();

      if (spotInsertError) throw spotInsertError;
    }

    // 3. 북마크 table에 새로운 북마크 저장
    const { data: bookmarkData, error: bookmarkInsertError } = await supabase
      .from('bookmarks')
      .insert([
        {
          user_id: userId,
          spot_id: itemData.id
        }
      ])
      .select();
    if (bookmarkInsertError) throw bookmarkInsertError;

    // 성공값 반환
    return {
      success: true,
      bookmark: bookmarkData
    };
  } catch (error) {
    console.error('[AddBookmark] Error ->', error);
    throw error;
  }
};

// 북마크 지우기
export const deleteBookmark = async (spotId, userId) => {
  try {
    const { error } = await supabase.from('bookmarks').delete().eq('user_id', userId).eq('spot_id', spotId);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('[DeleteBookmark] Error ->', error);
    throw error;
  }
};

// 카카오 데이터가 이미 유저의 북마크로 등록되어있는지 확인
export const isUserBookmark = async (itemDataId, userId) => {
  try {
    // Check if a user's bookmark exists for a given map API id (kakao_id)
    const { data, error } = await supabase
      .from('bookmarks')
      .select('id')
      .eq('user_id', userId)
      .eq('spot_id', itemDataId);

    if (error) throw error;

    return data.length > 0;
  } catch (error) {
    console.error('[isUserBookmark] Error ->', error);
    return false;
  }
};
