import User from './User';

function Header() {
  return (
    <header className="header">
      <div className="header--brand">
        <h1>
          <span className="underline">NoteFlow</span>
        </h1>
      </div>
      <div className="header--user">
        <ul className="header--date-time">
          <li id="current-date">Wednesday, 30 March 2022</li>
          <li id="current-time">18:18</li>
        </ul>
        <User />
      </div>
    </header>
  );
}

export default Header;
