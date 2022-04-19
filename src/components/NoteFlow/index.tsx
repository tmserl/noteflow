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

  // New note text input
  const [noteCreateInputValue, setNoteCreatorInputValue] = useState<string>('');

  function handleNoteCreatorInput(e: any) {
    setNoteCreatorInputValue(e.target.value);
  }

  function resetNoteCreatorInputField() {
    setNoteCreatorInputValue('');
  }

  // Notes data from Supabase
  const [rawNotesData, setRawNotesData] = useState<any>();
  const [sortedNotesData, setSortedNotesData] = useState<any>();

  // Fetch all notes
  async function fetchAllNotes() {
    const { data: notes } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });
    setRawNotesData(notes);
  }

  // Fetch notes on page mount
  useEffect(() => {
    fetchAllNotes();

    if (rawNotesData) {
      const groupByDate = (notesDataToSort: any) => {
        return notesDataToSort.reduce((groups: any, note: any) => {
          const date = new Date(note.created_at).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          });
          if (!groups.hasOwnProperty(date)) {
            groups[date] = [];
          }
          groups[date].push(note);
          return groups;
        }, {});
      };
      setSortedNotesData(groupByDate(rawNotesData));
    }
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
      .on('INSERT', (payload) => {
        setRealtimeSubscription(payload);
      })
      .subscribe();
  }, []);

  // New notes content added to notesData
  // useEffect(() => {
  //   if (realtimeSubscription) {
  //     setNotesData([
  //       {
  //         id: realtimeSubscription.new.id,
  //         note_content: realtimeSubscription.new.note_content,
  //         user_id: realtimeSubscription.new.user_id,
  //         created_at: realtimeSubscription.new.created_at,
  //       },
  //       ...notesData,
  //     ]);
  //   }
  // }, [realtimeSubscription]);

  return (
    <div className="column timeline-line">
      <NoteCreator
        noteCreateInputValue={noteCreateInputValue}
        handleNoteCreatorInput={handleNoteCreatorInput}
        createNoteBtnToggler={handleCreateNoteBtn}
      />
      <NotesStream notesData={sortedNotesData} deleteNote={deleteNote} />
    </div>
  );
}

export default NoteFlow;
