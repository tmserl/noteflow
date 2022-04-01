import { useState, useEffect } from 'react';

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
      <div onClick={handleAvatarClick} className="header--user-icon"></div>
      {isAvatarClicked && (
        <div className="header--user-login">
          <p>Login</p>
          <p>Logout</p>
        </div>
      )}
    </>
  );
}

export default User;
