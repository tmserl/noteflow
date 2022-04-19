import NoteCard from './NoteCard';
import NoteDate from './NoteDate';

// FIXME: Statically type props

function NotesStream({
  sortedNotesData,
  deleteNote,
}: {
  sortedNotesData: any;
  deleteNote: any;
}) {
  return (
    <div className="notes-stream column">
      {sortedNotesData && (
        <>
          {Object.entries(sortedNotesData).map(([date, notes], i) => (
            <>
              <NoteDate key={i} date={date} />
              {notes.map((note: any) => (
                <NoteCard
                  key={note.id}
                  id={note.id}
                  content={note.note_content}
                  time={note.created_at}
                  deleteNote={deleteNote}
                />
              ))}
            </>
          ))}
        </>
      )}
    </div>
  );
}

export default NotesStream;
