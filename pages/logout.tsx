import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
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

  return (
    <div className="wrapper">
      <section className="noteflow">
        <motion.div
          animate={{
            backgroundImage: [
              'linear-gradient(#ebebeb 0%,#d8d8d8 20%,#ebebeb 40%)',
              'linear-gradient(#ebebeb 20%,#d8d8d8 40%,#ebebeb 60%)',
              'linear-gradient(#ebebeb 40%,#d8d8d8 60%,#ebebeb 80%)',
              'linear-gradient(#ebebeb 60%,#d8d8d8 80%,#ebebeb 100%)',
              'linear-gradient(#ebebeb 80%,#d8d8d8 100%,#ebebeb 20%)',
              'linear-gradient(#ebebeb 100%,#d8d8d8 20%,#ebebeb 40%)',
            ],
          }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="column timeline-line"
        >
          <div className="note-card note-card__center">
            <textarea placeholder="Write your note"></textarea>
            <button>Create note</button>
          </div>
          <div className="spacer"></div>
        </motion.div>
      </section>
    </div>
  );
}

export default Logout;
