import { supabase } from "./SupabaseClient";

export async function signUpWithEmail(email, password, username) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username } // store username inside user metadata
    }
  });

  if (error) {
    console.error("Error signing up:", error.message);
    return { success: false, error: error.message };
  }

  // also save username in a separate table if needed
  if (data?.user) await saveUserProfile(data.user.id, username);

  return { success: true, data };
}

export async function signUpWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://simple-socal-app-react-with-supabas-mu.vercel.app/call-back" // after login, come back here
    }
  });

  if (error) {
    console.error("Google Sign-in Error:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

export async function signUpWithFacebook() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo: "https://simple-socal-app-react-with-supabas-mu.vercel.app/call-back"
    }
  });

  if (error) {
    console.error("Facebook Sign-in Error:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

export async function saveUserProfile(userId, username) {
  const { data, error } = await supabase
    .from("profiles")
    .insert([{ id: userId, username }]);

  if (error) {
    console.error("Profile insert error:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}
