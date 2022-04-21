import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import supabase from '../../../../../utils/supabaseClient';

function User() {
  const user: any = supabase.auth.user();
  const [isAvatarClicked, setIsAvatarClicked] = useState<boolean>(false);

  // Sets isAvatarClicked to false on page mount
  useEffect(() => {
    setIsAvatarClicked(false);
  }, []);

  function handleAvatarClick() {
    setIsAvatarClicked(!isAvatarClicked);
  }

  // Gets name initials from authenticated users
  const [userInitials, setUserInitials] = useState<string>('');

  useEffect(() => {
    function getInitialsFromUserFullName(fullName: string) {
      const allNames = fullName.trim().split(' ');
      const initials = allNames.reduce((acc, curr, index) => {
        if (index === 0 || index === allNames.length - 1) {
          acc = `${acc}${curr.charAt(0).toUpperCase()}`;
        }
        return acc;
      }, '');
      return initials;
    }
    if (user) {
      setUserInitials(getInitialsFromUserFullName(user.user_metadata.name));
    } else {
      setUserInitials('');
    }
  }, []);

  return (
    <>
      {user ? (
        <div onClick={handleAvatarClick} className="header--user-icon">
          <p className="header--user-initials">{userInitials}</p>
        </div>
      ) : (
        <motion.div
          animate={{ y: [0, -9, 0, -5, 0, -1, 0] }}
          transition={{ delay: 2, repeat: Infinity, repeatDelay: 5 }}
          onClick={handleAvatarClick}
          className="header--user-icon"
        >
          <p className="header--user-initials">{userInitials}</p>
        </motion.div>
      )}

      {isAvatarClicked && (
        <div className="header--user-login">
          <Link href="/login">Login</Link>
          <Link href="/logout">Logout</Link>
        </div>
      )}
    </>
  );
}

export default User;
