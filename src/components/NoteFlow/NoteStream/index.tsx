import { AnimatePresence } from 'framer-motion';
import { chownSync } from 'fs';
import NoteCard from './NoteCard';
import NoteDate from './NoteDate';

// FIXME: Statically type props

function NotesStream({
  sortedNotesData,
  deleteNote,
  noteCategories,
  categoryToggles,
  handleCategoryToggles,
}: {
  sortedNotesData: any;
  deleteNote: any;
  noteCategories: string[];
  categoryToggles: string[];
  handleCategoryToggles: any;
}) {
  return (
    <div className="notes-stream">
      {noteCategories && (
        <div className="categories">
          {noteCategories.map((category: string) => (
            <button
              onClick={handleCategoryToggles}
              value={category}
              name={category}
            >
              {category}
            </button>
          ))}
        </div>
      )}
      {sortedNotesData && (
        <>
          {Object.entries(sortedNotesData).map(
            ([noteDate, noteContent]: [noteDate: any, noteContent: any], i) => (
              <div key={i}>
                <NoteDate noteDate={noteDate} />
                <div className="column">
                  <AnimatePresence>
                    {noteContent
                      .filter((item: any) =>
                        categoryToggles.includes(item.category)
                      )
                      .map((note: any) => (
                        <>
                          <NoteCard
                            key={note.id}
                            id={note.id}
                            content={note.note_content}
                            category={note.category}
                            time={note.created_at}
                            deleteNote={deleteNote}
                          />
                        </>
                      ))}
                  </AnimatePresence>
                </div>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}

export default NotesStream;
