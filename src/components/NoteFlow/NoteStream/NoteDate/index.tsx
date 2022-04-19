function NoteDate({ noteDate }: { noteDate: string }) {
  const options: any = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  // Gets today's date
  const todaysDate = new Date().toLocaleDateString('en-GB', options);

  // Gets yesterday's date
  const timestamp = new Date().getTime();
  const yesterdaysTimestamp = timestamp - 24 * 60 * 60 * 1000;
  const yesterdaysDate = new Date(yesterdaysTimestamp).toLocaleDateString(
    'en-gb',
    options
  );

  return (
    <h2 className="notes-date">
      {noteDate === todaysDate
        ? 'Today'
        : noteDate === yesterdaysDate
        ? 'Yesterday'
        : noteDate}
    </h2>
  );
}

export default NoteDate;
