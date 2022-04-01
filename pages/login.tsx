import { useEffect } from 'react';
import supabase from '../utils/supabaseClient';

function Login() {
  useEffect(() => {
    supabase.auth.signIn({ provider: 'github' });
  }, []);

  return <p>Logging in</p>;
}

export default Login;
