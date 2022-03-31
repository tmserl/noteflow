import { useState } from 'react';
import NoteCreator from './NoteCreator';
import NotesStream from './NoteStream';

function NoteFlow() {
  const [createNoteBtnToggle, setCreateNoteBtnToggle] =
    useState<boolean>(false);

  function createNoteBtnToggler() {
    setCreateNoteBtnToggle(!createNoteBtnToggle);
  }

  return (
    <div className="column timeline-line">
      <NoteCreator createNoteBtnToggler={createNoteBtnToggler} />
      <NotesStream />
    </div>
  );
}

export default NoteFlow;
