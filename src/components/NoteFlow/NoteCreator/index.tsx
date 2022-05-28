// FIXME: Statically type handleNoteCreatorInput prop
// TODO: Add function that allows a user to pick a category they want to add to their new note

function NoteCreator({
  createNoteBtnToggler,
  handleNoteCreatorInput,
  handleNoteCreatorCategory,
  handleNewCategorySelection,
  noteCreateInputValue,
  noteCreateCategoryValue,
  noteCategories,
}: {
  createNoteBtnToggler: React.MouseEventHandler;
  handleNoteCreatorInput: any;
  handleNoteCreatorCategory: any;
  handleNewCategorySelection: any;
  noteCreateInputValue: string;
  noteCreateCategoryValue: string;
  noteCategories: any;
}) {
  console.log(noteCreateCategoryValue);
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
            <button
              onClick={handleNewCategorySelection}
              key={category}
              value={category}
              name={category}
            >
              {category}
            </button>
          ))}
      </div>
    </div>
  );
}

export default NoteCreator;
