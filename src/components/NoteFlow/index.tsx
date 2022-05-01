import { useState, useEffect } from 'react';
import supabase from '../../../utils/supabaseClient';
import NoteCreator from './NoteCreator';
import NotesStream from './NoteStream';

// FIXME: Statically type notesData state
// FIXME: Statically type event parameter
// FIXME: Statically type user object
// FIXME: Statically type realtimeSubscription state
// TODO: Cleanup subscription after idle: supabase.removeSubscription(mySubscription)

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
  const [notesData, setNotesData] = useState<any>();

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

  // Supabase: Fetch all notes
  async function fetchAllNotes() {
    const { data: notes } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });
    setNotesData(groupByDate(notes));
    console.log(notes);
  }

  // Fetch notes and group by dates on page mount
  useEffect(() => {
    fetchAllNotes();
  }, []);

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
      <NotesStream sortedNotesData={notesData} deleteNote={deleteNote} />
    </div>
  );
}

export default NoteFlow;
