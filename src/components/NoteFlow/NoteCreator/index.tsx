// FIXME: Statically type handleNoteCreatorInput prop

function NoteCreator({
  createNoteBtnToggler,
  handleNoteCreatorInput,
  handleNoteCreatorCategory,
  noteCreateInputValue,
  noteCreateCategoryValue,
}: {
  createNoteBtnToggler: React.MouseEventHandler;
  handleNoteCreatorInput: any;
  handleNoteCreatorCategory: any;
  noteCreateInputValue: string;
  noteCreateCategoryValue: string;
}) {
  return (
    <div className="note-card note-card__center">
      <textarea
        onChange={handleNoteCreatorInput}
        placeholder="Write your note"
        value={noteCreateInputValue}
      ></textarea>
      <button onClick={createNoteBtnToggler}>Create note</button>
      <input
        onChange={handleNoteCreatorCategory}
        placeholder="#"
        type="text"
        value={noteCreateCategoryValue}
      />
    </div>
  );
}

export default NoteCreator;
