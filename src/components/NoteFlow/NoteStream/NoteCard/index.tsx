import { notDeepStrictEqual } from 'assert';
import { motion, AnimatePresence } from 'framer-motion';
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
  const noteCardVarirants = {
    hidden: { x: '-1vw', opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const dateTime = new Date(time);

  return (
    <motion.div
      variants={noteCardVarirants}
      initial="hidden"
      animate="visible"
      className="note-card note-card__alternate"
    >
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
    </motion.div>
  );
}

export default NoteCard;
