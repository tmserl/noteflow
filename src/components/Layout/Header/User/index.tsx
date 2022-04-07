import { useState, useEffect } from 'react';
import Link from 'next/link';

function User() {
  const [isAvatarClicked, setIsAvatarClicked] = useState<boolean>(false);

  // Sets isAvatarClicked to false on page mount
  useEffect(() => {
    setIsAvatarClicked(false);
  }, []);

  function handleAvatarClick() {
    setIsAvatarClicked(!isAvatarClicked);
  }

  return (
    <>
      <div onClick={handleAvatarClick} className="header--user-icon">
        <p className="header--user-initials">TE</p>
      </div>
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
