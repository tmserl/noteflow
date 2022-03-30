import NoteCreator from './NoteCreator';
import NotesStream from './NoteStream';

function NoteFlow() {
  return (
    <div className="column timeline-line">
      <NoteCreator />
      <NotesStream />
    </div>
  );
}

export default NoteFlow;
