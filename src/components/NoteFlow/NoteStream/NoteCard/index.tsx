// FIXME: Statically type deleteNote prop

function NoteCard({
  id,
  content,
  time,
  deleteNote,
}: {
  id: number;
  content: string;
  time: string;
  deleteNote: any;
}) {
  const dateTime = new Date(time);

  return (
    <div className="note-card note-card__alternate">
      <div className="note-card--content">
        <p>{content}</p>
      </div>
      <div className="note-card--time note-card--time__alternate">
        <span>
          {dateTime.toLocaleTimeString('uk', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
      <div className="note-card--delete">
        <p
          onClick={() => {
            deleteNote(id);
          }}
        >
          Delete
        </p>
      </div>
    </div>
  );
}

export default NoteCard;
