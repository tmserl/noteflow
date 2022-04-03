// FIXME: Statically type handleNoteCreatorInput prop

function NoteCreator({
  createNoteBtnToggler,
  handleNoteCreatorInput,
  noteCreateInputValue,
}: {
  createNoteBtnToggler: React.MouseEventHandler;
  handleNoteCreatorInput: any;
  noteCreateInputValue: string;
}) {
  return (
    <div className="note-card note-card__center">
      <textarea
        onChange={handleNoteCreatorInput}
        placeholder="Write your note"
        value={noteCreateInputValue}
      ></textarea>
      <button onClick={createNoteBtnToggler}>Create note</button>
    </div>
  );
}

export default NoteCreator;
