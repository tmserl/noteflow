import { useState, useEffect } from 'react';
import NoteCard from './NoteCard';
import NoteDate from './NoteDate';

// FIXME: Statically type props

function NotesStream({
  notesData,
  deleteNote,
}: {
  notesData: any;
  deleteNote: any;
}) {
  const [groupedNotesByDate, setGroupedNotesByDate] = useState<object>({});

  useEffect(() => {
    if (notesData) {
      const groupByDate = (noteData: any) => {
        return noteData.reduce((groups: any, note: any) => {
          const date = new Date(note.created_at).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          });
          if (!groups.hasOwnProperty(date)) {
            groups[date] = [];
          }
          groups[date].push(note);
          return groups;
        }, {});
      };
      setGroupedNotesByDate(groupByDate(notesData));
    }
  }, []);

  console.log(groupedNotesByDate);

  return (
    <div className="notes-stream column">
      {notesData && (
        <>
          {Object.entries(groupedNotesByDate).map(([date, notes], i) => (
            <>
              <NoteDate date={date} />
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
    </div>
  );
}

export default NotesStream;
