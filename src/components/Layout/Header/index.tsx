import User from './User';

function Header() {
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="header">
      <div className="header--brand">
        <h1>
          <span className="underline">NoteFlow</span>
        </h1>
      </div>
      <div className="header--user">
        <ul className="header--date-time">
          <li id="current-date">{today}</li>
        </ul>
        <User />
      </div>
    </header>
  );
}

export default Header;
