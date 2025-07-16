import { createContext, useContext, useEffect, useState } from 'react';
import supabase from './../supabase/SupabaseClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 로그인 상태 확인
    const fetchSession = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();

      console.log(`session =>`, session);
      if (error) console.error('세션 불러오기 실패', error);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    fetchSession();

    // 로그인/로그아웃 등 인증 상태 변화 감지
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 컴포넌트가 꺼질 때 리스너 해제
    return () => {
      subscription?.unsubscribe();
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
