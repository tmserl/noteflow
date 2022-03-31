import React, { MouseEventHandler } from 'react';

function NoteCreator({
  createNoteBtnToggler,
}: {
  createNoteBtnToggler: React.MouseEventHandler;
}) {
  return (
    <div className="note-card note-card__center">
      <textarea placeholder="Write your note"></textarea>
      <button onClick={createNoteBtnToggler}>Create note</button>
    </div>
  );
}

export default NoteCreator;
