import { useState, useEffect } from 'react';
import supabase from '../../../utils/supabaseClient';
import NoteCreator from './NoteCreator';
import NotesStream from './NoteStream';

// FIXME: Statically type notesData state
// FIXME: Statically type event parameter
// FIXME: Statically type user object
// FIXME: Statically type realtimeSubscription state
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
  async function newNote() {
    const { data, error } = await supabase
      .from('notes')
      .insert([{ note_content: noteCreateInputValue, user_id: user.id }]);
  }
  // Create note on button click
  useEffect(() => {
    if (user && noteCreateInputValue.length >= 1) {
      newNote();
      resetNoteCreatorInputField();
    }
  }, [createNoteBtnToggle]);

  // Delete note
  async function deleteNote(id: number) {
    const { data, error } = await supabase.from('notes').delete().eq('id', id);
    fetchAllNotes();
  }

  // Setup realtime subscription to all events
  const [realtimeSubscription, setRealtimeSubscription] = useState<any>();

  useEffect(() => {
    const subscription = supabase
      .from('notes')
      .on('*', (payload) => {
        setRealtimeSubscription(payload);
      })
      .subscribe();
  }, []);

  // New notes content added to notesData
  useEffect(() => {
    if (realtimeSubscription) {
      // Need to add other items to the object including id (for the map key) and user auth id
      setNotesData([
        {
          note_content: realtimeSubscription.new.note_content,
          created_at: realtimeSubscription.new.created_at,
        },
        ...notesData,
      ]);
    }
  }, [realtimeSubscription]);

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
