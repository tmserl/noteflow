import { useState, useEffect } from 'react';
import supabase from '../../../utils/supabaseClient';
import NoteCreator from './NoteCreator';
import NotesStream from './NoteStream';

// FIXME: Statically type notesData state
// FIXME: Statically type event parameter
// FIXME: Statically type user object

function NoteFlow() {
  const user: any = supabase.auth.user();

  // 'Create note' Button
  const [createNoteBtnToggle, setCreateNoteBtnToggle] =
    useState<boolean>(false);

  function handleCreateNoteBtn() {
    setCreateNoteBtnToggle(!createNoteBtnToggle);
  }

  // New note
  const [noteCreateInputValue, setNoteCreatorInputValue] = useState<string>('');
  const [noteCreateCategoryValue, setNoteCreateCategoryValue] =
    useState<string>('');

  function handleNoteCreatorInput(e: any) {
    setNoteCreatorInputValue(e.target.value);
  }

  function handleNoteCreatorCategory(e: any) {
    setNoteCreateCategoryValue(e.target.value);
  }

  function resetNoteCreatorInputFields() {
    setNoteCreatorInputValue('');
    setNoteCreateCategoryValue('');
  }

  // Notes data from Supabase
  const [notesRawData, setNotesRawData] = useState<any>();
  const [notesSortedData, setNotesSortedData] = useState<any>();

  const groupByDate = (notesDataToSort: any) => {
    return notesDataToSort.reduce((groups: any, note: any) => {
      const date = new Date(note.created_at).toLocaleDateString('en-GB', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      if (!groups.hasOwnProperty(date)) {
        groups[date] = [];
      }
      groups[date].push(note);
      return groups;
    }, {});
  };

  // Categories Filter
  const [categoryToggles, setCategoryToggles] = useState<string[]>([]);

  function handleCategoryToggles(e: any) {
    setCategoryToggles([...categoryToggles, e.target.value]);
  }

  console.log(categoryToggles);

  // Supabase: Fetch all notes
  async function fetchAllNotes() {
    const { data: notes } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });
    setNotesRawData(notes);
    setNotesSortedData(groupByDate(notes));
  }

  // Fetch notes and group by dates on page mount
  useEffect(() => {
    fetchAllNotes();
  }, []);

  // Categories from data
  const [noteCategories, setNoteCategories] = useState<any>();
  // Makes a list of the note categories used
  useEffect(() => {
    if (notesRawData) {
      const categoryArray = notesRawData.map((note: any) => note.category);
      const categoryArrayWithNoNulls = categoryArray.filter(
        (category: string) => {
          return category !== '';
        }
      );
      const uniqueCategories = [...new Set(categoryArrayWithNoNulls)];
      setNoteCategories(uniqueCategories.sort());
    }
  }, [notesRawData]);

  // Supabase: Create new note
  async function newNote() {
    const { data, error } = await supabase.from('notes').insert([
      {
        note_content: noteCreateInputValue,
        category: noteCreateCategoryValue,
        user_id: user.id,
      },
    ]);
  }

  // Create note on button click
  useEffect(() => {
    if (user && noteCreateInputValue.length >= 1) {
      newNote();
      resetNoteCreatorInputFields();
      const timer = setTimeout(() => {
        fetchAllNotes();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [createNoteBtnToggle]);

  // Delete note
  async function deleteNote(id: number) {
    const { data, error } = await supabase.from('notes').delete().eq('id', id);
    fetchAllNotes();
  }

  return (
    <div className="column timeline-line">
      <NoteCreator
        noteCreateInputValue={noteCreateInputValue}
        noteCreateCategoryValue={noteCreateCategoryValue}
        handleNoteCreatorInput={handleNoteCreatorInput}
        handleNoteCreatorCategory={handleNoteCreatorCategory}
        createNoteBtnToggler={handleCreateNoteBtn}
      />
      <NotesStream
        sortedNotesData={notesSortedData}
        deleteNote={deleteNote}
        noteCategories={noteCategories}
        handleCategoryToggles={handleCategoryToggles}
      />
    </div>
  );
}

export default NoteFlow;
