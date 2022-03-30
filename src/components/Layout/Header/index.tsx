function Header() {
  return (
    <header className="header">
      <h1>
        <span className="underline">NoteFlow</span>
      </h1>
      <ul className="date-time">
        <li id="current-date">Wednesday, 30 March 2022</li>
        <li id="current-time">18:18</li>
      </ul>
    </header>
  );
}

export default Header;
