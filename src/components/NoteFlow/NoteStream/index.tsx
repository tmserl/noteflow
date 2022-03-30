import NoteDate from './NoteDate';
import NoteCard from './NoteCard';

function NotesStream() {
  return (
    <div className="notes-stream column">
      <NoteDate date="Today" />
      <NoteCard content="This is another note after that!." time="16:16" />
      <NoteCard content="This is another note after that!." time="16:16" />
      <NoteDate date="Yesterday" />
      <NoteCard content="This is my first note." time="16:15" />
      <NoteCard content="This is my first note." time="16:15" />
    </div>
  );
}

export default NotesStream;
