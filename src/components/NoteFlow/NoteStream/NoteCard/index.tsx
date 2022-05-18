import { motion } from 'framer-motion';
// FIXME: Statically type deleteNote prop

function NoteCard({
  id,
  content,
  category,
  time,
  deleteNote,
}: {
  id: number;
  content: string;
  category: string;
  time: string;
  deleteNote: any;
}) {
  const noteCardVarirants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.3, duration: 0.25 } },
  };

  const dateTime = new Date(time);

  return (
    <motion.div
      variants={noteCardVarirants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="note-card note-card__alternate"
    >
      <div className="note-card--content">
        <p>{content}</p>
      </div>
      <div className="note-card--category">
        <p>{category}</p>
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
    </motion.div>
  );
}

export default NoteCard;
