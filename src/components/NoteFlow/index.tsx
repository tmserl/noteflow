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
  const [noteCreatorContent, setNoteCreatorContent] = useState<string>('');

  function handleNoteCreatorInput(e: any) {
    setNoteCreatorContent(e.target.value);
  }

  // Notes data from Supabase
  const [notesData, setNotesData] = useState<any>();

  // Fetch all notes
  async function fetchNotes() {
    const { data: notes } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });
    setNotesData(notes);
  }

  // Fetch notes on page mount
  useEffect(() => {
    fetchNotes();
  }, []);

  // Create new note
  useEffect(() => {
    async function newNote() {
      const { data, error } = await supabase
        .from('notes')
        .insert([{ note_content: noteCreatorContent, user_id: user.id }]);
    }
    if (user) {
      if (noteCreatorContent.length >= 1) {
        newNote();
      }
    }
    fetchNotes();
  }, [createNoteBtnToggle]);

  return (
    <div className="column timeline-line">
      <NoteCreator
        handleNoteCreatorInput={handleNoteCreatorInput}
        createNoteBtnToggler={handleCreateNoteBtn}
      />
      <NotesStream notesData={notesData} />
    </div>
  );
}

export default NoteFlow;
