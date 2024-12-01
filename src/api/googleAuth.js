import supabase from "./superbaseClient"

const googleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
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
    await googleSignIn();
    await getUserAuth();
}