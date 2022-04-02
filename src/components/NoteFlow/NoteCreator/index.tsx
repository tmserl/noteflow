// FIXME: Statically type handleNoteCreatorInput prop

function NoteCreator({
  createNoteBtnToggler,
  handleNoteCreatorInput,
}: {
  createNoteBtnToggler: React.MouseEventHandler;
  handleNoteCreatorInput: any;
}) {
  return (
    <div className="note-card note-card__center">
      <textarea
        onChange={handleNoteCreatorInput}
        placeholder="Write your note"
      ></textarea>
      <button onClick={createNoteBtnToggler}>Create note</button>
    </div>
  );
}

export default NoteCreator;
