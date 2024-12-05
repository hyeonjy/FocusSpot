import supabase from "./superbaseClient";

export const uploadProfileImgToStore = async (userEmail, file) => {
    const date = new Date().getTime();

    const { data, error } = await supabase.storage
        .from('profile-images')
        .upload(`${userEmail}/${date}_${file.name}`, file);
    if (error) throw (error);

    return data.path;
}

export const uploadUserProfile = async (userName, userEmail, imgStoragePath) => {
    const { data: imgPath, error: pathErr } = supabase.storage.from('profile-images').getPublicUrl(imgStoragePath);
    if (pathErr) throw (pathErr);

    const { data: newUser, error: tableErr } = await supabase
        .from('users')
        .insert({ name: userName, email: userEmail, profile_picture: imgPath.publicUrl })
        .select()
        .single();
    if (tableErr) throw (tableErr);

    return newUser;
}

export const getUserSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw (error);

    return data;
}

// 프로필 업데이트를 위함
export const updateUserProfile = async (userName, userEmail, imgStoragePath) => {
  const updatePayload = { name: userName };
  if (imgStoragePath) {
    const { data: imgPath, error: pathErr } = supabase.storage.from('profile-images').getPublicUrl(imgStoragePath);
    if (pathErr) throw pathErr;

    updatePayload.profile_picture = imgPath.publicUrl; // 새로운 이미지만
  }

  // DB에 업데이트
  const { data: updatedUser, error: tableErr } = await supabase
    .from('users')
    .update(updatePayload)
    .eq('email', userEmail)
    .select()
    .single();

  if (tableErr) throw tableErr;

  return updatedUser;
};