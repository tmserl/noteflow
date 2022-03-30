import supabase from '../utils/supabaseClient';
import NoteFlow from '../src/components/NoteFlow';

function Home() {
  return (
    <div className="wrapper">
      <section className="noteflow">
        <NoteFlow />
      </section>
    </div>
  );
}

export default Home;
