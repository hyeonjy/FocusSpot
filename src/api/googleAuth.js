import supabase from "./superbaseClient"

//vercel 배포하고 난 다음에 경로를 제대로 재설정해줍시다!
const hostingUrl = 'http://localhost:8088'

export const googleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
            redirectTo: `${hostingUrl}/login`
        },
    });
    if (error) throw error

    return data
}

export const googleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error
}

export const getUserAuth = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error
    return data
}

export const getUserDataFromSession = async () => {
    try {
        const data = await getUserAuth();
        const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('email', data.user.email)
            .single();

        if (userData) {
            const { id, email, name, profile_picture } = userData;

            return { userId: id, email, name, profileImg: profile_picture }
        }

    } catch (error) {
        return null;
    }
}