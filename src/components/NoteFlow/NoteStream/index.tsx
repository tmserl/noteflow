import { AnimatePresence } from 'framer-motion';
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
    <div className="notes-stream">
      {sortedNotesData && (
        <>
          {Object.entries(sortedNotesData).map(([noteDate, noteContent], i) => (
            <div key={i}>
              <NoteDate noteDate={noteDate} />
              <div className="column">
                <AnimatePresence>
                  {noteContent.map((note: any) => (
                    <NoteCard
                      key={note.id}
                      id={note.id}
                      content={note.note_content}
                      time={note.created_at}
                      deleteNote={deleteNote}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default NotesStream;
