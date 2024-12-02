import supabase from "./superbaseClient"

//vercel 배포하고 난 다음에 경로를 제대로 재설정해줍시다!
const hostingUrl = 'http://localhost:8088'

export const googleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
            redirectTo: `${hostingUrl}/login`
        },
    });
    if(error) console.error(error);
}

export const googleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error);
}

export const getUserAuth = async () => {
    const { error } = await supabase.auth.getUser();
    if (error) console.error(error);
}

export const signIn = async () => {
    //이미 회원가입한 유저는 홈으로, 그렇지 않은 유저는 로그인 페이지에서 마저 회원정보를 등록하도록
    await googleSignIn();
    await getUserAuth();
}