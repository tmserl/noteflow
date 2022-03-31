import NoteCard from './NoteCard';

function NotesStream({ notesData }: { notesData: any }) {
  return (
    <div className="notes-stream column">
      {notesData && (
        <>
          {notesData.map((note: any) => (
            <NoteCard
              key={note.id}
              content={note.note_content}
              time={note.created_at}
            />
          ))}
        </>
      )}
      {/* <NoteDate date="Today" />*/}
    </div>
  );
}

export default NotesStream;
