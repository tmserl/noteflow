import { motion } from 'framer-motion';

// FIXME: Statically type options object

function NoteDate({ noteDate }: { noteDate: string }) {
  const options: any = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const noteDateVariants = {
    hidden: { y: '-10', opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  // Gets today's date
  const todaysDate = new Date().toLocaleDateString('en-GB', options);

  // Gets yesterday's date
  const timestamp = new Date().getTime();
  const yesterdaysTimestamp = timestamp - 24 * 60 * 60 * 1000;
  const yesterdaysDate = new Date(yesterdaysTimestamp).toLocaleDateString(
    'en-gb',
    options
  );

  return (
    <motion.h2
      variants={noteDateVariants}
      initial="hidden"
      animate="visible"
      className="notes-date"
    >
      {noteDate === todaysDate
        ? 'Today'
        : noteDate === yesterdaysDate
        ? 'Yesterday'
        : noteDate}
    </motion.h2>
  );
}

export default NoteDate;
