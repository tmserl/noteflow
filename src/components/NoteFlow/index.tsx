import { useState, useEffect } from 'react';
import supabase from '../../../utils/supabaseClient';
import NoteCreator from './NoteCreator';
import NotesStream from './NoteStream';

function NoteFlow() {
  const [createNoteBtnToggle, setCreateNoteBtnToggle] =
    useState<boolean>(false);

  function createNoteBtnToggler() {
    setCreateNoteBtnToggle(!createNoteBtnToggle);
  }

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
      <NoteCreator createNoteBtnToggler={createNoteBtnToggler} />
      <NotesStream notesData={notesData} />
    </div>
  );
}

export default NoteFlow;
