import NoteFlow from '../src/components/NoteFlow';
import supabase from '../utils/supabaseClient';

function Home() {
  console.log(supabase.auth.user());

  return (
    <div className="wrapper">
      <section className="noteflow">
        <NoteFlow />
      </section>
    </div>
  );
}

export default Home;
