// FIXME: Statically type handleNoteCreatorInput prop
// TODO: Add function that allows a user to pick a category they want to add to their new note

function NoteCreator({
  createNoteBtnToggler,
  handleNoteCreatorInput,
  handleNoteCreatorCategory,
  noteCreateInputValue,
  noteCreateCategoryValue,
  noteCategories,
  setNoteCategories,
}: {
  createNoteBtnToggler: React.MouseEventHandler;
  handleNoteCreatorInput: any;
  handleNoteCreatorCategory: any;
  noteCreateInputValue: string;
  noteCreateCategoryValue: string;
  noteCategories: any;
  setNoteCategories: any;
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
        className="new-category-input"
        onChange={handleNoteCreatorCategory}
        placeholder="#"
        type="text"
        value={noteCreateCategoryValue}
      />
      <div className="category-selection">
        {noteCategories &&
          noteCategories.map((category: string) => (
            <button key={category} value={category} name={category}>
              {category}
            </button>
          ))}
      </div>
    </div>
  );
}

export default NoteCreator;
