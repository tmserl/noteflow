import { useState, useEffect } from 'react';
import supabase from '../../../utils/supabaseClient';
import NoteCreator from './NoteCreator';
import NotesStream from './NoteStream';

// FIXME: Statically type notesData state
// FIXME: Statically type event parameter

function NoteFlow() {
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

  useEffect(() => {
    async function fetchNotes() {
      const { data: notes } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false });
      setNotesData(notes);
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
