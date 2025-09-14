// UserContext.jsx
import { createContext, useState, useEffect } from "react";
import { supabase } from "./SupabaseClient";


const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setUser(null);
        return;
      }

      const authUser = session.user;

      // fetch profile info from your "profiles" table
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        setUser({ ...authUser }); // fallback: just auth info
      } else {
        // combine auth and profile info
        setUser({ ...authUser, ...profileData });
      }
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        setUser(null);
        return;
      }

      const authUser = session.user;

      supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single()
        .then(({ data: profileData, error }) => {
          if (error) setUser({ ...authUser });
          else setUser({ ...authUser, ...profileData });
        });
    });

    return () => listener?.subscription?.unsubscribe?.();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
