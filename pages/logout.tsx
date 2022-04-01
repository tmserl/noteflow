import { useEffect } from 'react';
import { useRouter } from 'next/router';
import supabase from '../utils/supabaseClient';

function Logout() {
  const router = useRouter();
  useEffect(() => {
    async function logout() {
      await supabase.auth.signOut();
      router.push('/');
    }
    logout();
  }, []);

  return <p>Logging out</p>;
}

export default Logout;
