import { useState, useEffect } from 'react';
import supabase from '../../../utils/supabaseClient';
import NoteCreator from './NoteCreator';
import NotesStream from './NoteStream';

// FIXME: Statically type notesData state
// FIXME: Statically type event parameter
// FIXME: Statically type user object
// TODO: Refactor code for fetching all notes and creating new notes

function NoteFlow() {
  const user: any = supabase.auth.user();

  // 'Create note' Button
  const [createNoteBtnToggle, setCreateNoteBtnToggle] =
    useState<boolean>(false);

  function handleCreateNoteBtn() {
    setCreateNoteBtnToggle(!createNoteBtnToggle);
  }

  // New note text input
  const [noteCreateInputValue, setNoteCreatorInputValue] = useState<string>('');

  function handleNoteCreatorInput(e: any) {
    setNoteCreatorInputValue(e.target.value);
  }

  function resetNoteCreatorInputField() {
    setNoteCreatorInputValue('');
  }

  // Notes data from Supabase
  const [notesData, setNotesData] = useState<any>();

  // Fetch all notes
  async function fetchAllNotes() {
    const { data: notes } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });
    setNotesData(notes);
  }

  // Fetch notes on page mount
  useEffect(() => {
    fetchAllNotes();
  }, []);

  // Create new note
  useEffect(() => {
    async function newNote() {
      const { data, error } = await supabase
        .from('notes')
        .insert([{ note_content: noteCreateInputValue, user_id: user.id }]);
    }
    if (user) {
      if (noteCreateInputValue.length >= 1) {
        newNote();
        fetchAllNotes();
        resetNoteCreatorInputField();
      }
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
        handleNoteCreatorInput={handleNoteCreatorInput}
        createNoteBtnToggler={handleCreateNoteBtn}
      />
      <NotesStream notesData={notesData} deleteNote={deleteNote} />
    </div>
  );
}

export default NoteFlow;
