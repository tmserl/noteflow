function NoteCreator() {
  return (
    <div className="note-card note-card__center">
      <form>
        <textarea placeholder="Write your note"></textarea>
        <button>Create note</button>
      </form>
    </div>
  );
}

export default NoteCreator;
