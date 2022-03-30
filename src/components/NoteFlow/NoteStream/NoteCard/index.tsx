function NoteCard({ content, time }: { content: string; time: string }) {
  return (
    <div className="note-card note-card__alternate">
      <div className="note-card--content">
        <p>{content}</p>
      </div>
      <div className="note-card--time note-card--time__alternate">
        <span>{time}</span>
      </div>
    </div>
  );
}

export default NoteCard;
