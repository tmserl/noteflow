import NoteCard from './NoteCard';

// FIXME: Statically type props

function NotesStream({
  notesData,
  deleteNote,
}: {
  notesData: any;
  deleteNote: any;
}) {
  return (
    <div className="notes-stream column">
      {notesData && (
        <>
          {notesData.map((note: any) => (
            <NoteCard
              key={note.id}
              id={note.id}
              content={note.note_content}
              time={note.created_at}
              deleteNote={deleteNote}
            />
          ))}
        </>
      )}
      {/* <NoteDate date="Today" />*/}
    </div>
  );
}

export default NotesStream;
