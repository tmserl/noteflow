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
              'linear-gradient(#ebebeb 0%,#d8d8d8 10%,#ebebeb 20%)',
              'linear-gradient(#ebebeb 10%,#d8d8d8 20%,#ebebeb 30%)',
              'linear-gradient(#ebebeb 20%,#d8d8d8 30%,#ebebeb 40%)',
              'linear-gradient(#ebebeb 30%,#d8d8d8 40%,#ebebeb 50%)',
              'linear-gradient(#ebebeb 40%,#d8d8d8 50%,#ebebeb 60%)',
              'linear-gradient(#ebebeb 50%,#d8d8d8 60%,#ebebeb 70%)',
              'linear-gradient(#ebebeb 60%,#d8d8d8 70%,#ebebeb 80%)',
              'linear-gradient(#ebebeb 70%,#d8d8d8 80%,#ebebeb 90%)',
              'linear-gradient(#ebebeb 80%,#d8d8d8 90%,#ebebeb 190%)',
              'linear-gradient(#ebebeb 90%,#d8d8d8 100%,#ebebeb 10%)',
              'linear-gradient(#ebebeb 100%,#d8d8d8 10%,#ebebeb 20%)',
            ],
          }}
          transition={{ duration: 1, repeat: Infinity }}
          className="column timeline-line"
        >
          <motion.div
            animate={{ backgroundColor: ['#fafafa', '#ededed', '#fafafa'] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="note-card note-card__center"
          >
            <textarea disabled={true}></textarea>
            <br />
            <br />
            <br />
            <br />
            <br />
          </motion.div>
          <div className="spacer"></div>
        </motion.div>
      </section>
    </div>
  );
}

export default Logout;
