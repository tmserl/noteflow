import { AnimatePresence } from 'framer-motion';
import NoteCard from './NoteCard';
import NoteDate from './NoteDate';

// FIXME: Statically type props

function NotesStream({
  sortedNotesData,
  deleteNote,
  noteCategories,
}: {
  sortedNotesData: any;
  deleteNote: any;
  noteCategories: string[];
}) {
  return (
    <div className="notes-stream">
      {noteCategories && (
        <div className="notes-categories">
          <ul>
            {noteCategories.map((category: string) => (
              <li>{category}</li>
            ))}
          </ul>
        </div>
      )}

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
