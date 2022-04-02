import NoteFlow from '../src/components/NoteFlow';
import supabase from '../utils/supabaseClient';

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
