function Header() {
  return (
    <header>
      <h1>
        <span className="underline">NoteFlow</span>
      </h1>
      <ul className="date-time">
        <li id="current-date"></li>
        <li id="current-time"></li>
      </ul>
    </header>
  );
}

export default Header;
