import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
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
  // Filters sortedNotesData depending on what Categories are picked
  const [categoryFilteredNotes, setCategoryFilteredNotes] = useState<any>({});
  useEffect(() => {
    if (sortedNotesData && noteCategories) {
      setCategoryFilteredNotes(
        Object.fromEntries(
          Object.entries(sortedNotesData)
            .map(([key, value]: [key: any, value: any]) => [
              key,
              value.filter(({ category }: { category: any }) =>
                noteCategories.includes(category)
              ),
            ])
            .filter(([, value]) => value.length)
        )
      );
      if (categoryToggles.length >= 1) {
        setCategoryFilteredNotes(
          Object.fromEntries(
            Object.entries(sortedNotesData)
              .map(([key, value]: [key: any, value: any]) => [
                key,
                value.filter(({ category }: { category: any }) =>
                  categoryToggles.includes(category)
                ),
              ])
              .filter(([, value]) => value.length)
          )
        );
      }
    }
  }, [categoryToggles, sortedNotesData]);

  return (
    <div className="notes-stream">
      {noteCategories && (
        <div className="categories">
          {noteCategories.map((category: string) => (
            <button
              key={category}
              onClick={handleCategoryToggles}
              value={category}
              name={category}
            >
              {category}
            </button>
          ))}
        </div>
      )}
      {categoryFilteredNotes && (
        <>
          {Object.entries(categoryFilteredNotes).map(
            ([noteDate, noteContent]: [noteDate: any, noteContent: any], i) => (
              <div key={i}>
                <NoteDate noteDate={noteDate} />
                <div className="column">
                  <AnimatePresence>
                    {categoryToggles.length === 0
                      ? noteContent.map((note: any) => (
                          <NoteCard
                            key={note.id}
                            id={note.id}
                            content={note.note_content}
                            category={note.category}
                            time={note.created_at}
                            deleteNote={deleteNote}
                          />
                        ))
                      : noteContent
                          .filter((item: any) =>
                            categoryToggles.includes(item.category)
                          )
                          .map((note: any) => (
                            <NoteCard
                              key={note.id}
                              id={note.id}
                              content={note.note_content}
                              category={note.category}
                              time={note.created_at}
                              deleteNote={deleteNote}
                            />
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
