import { createContext, useContext, useEffect, useState } from 'react';
import supabase from './../supabase/SupabaseClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();

      if (error) {
        console.error('세션 가져오기 오류:', error);
        return;
      }

      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const {
      data: { authListener }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signInWithPassword(data),
    signOut: () => supabase.auth.signOut()
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
