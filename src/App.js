import { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NewNote from "./components/NewNote";
import NoteViewer from "./components/NoteViewer";
import EmptyNote from "./components/EmptyNote";
import { supabase } from "./utils/supabase";

function App() {
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  const fetchNotes = async () => {
    /** supabase
     * .from('note')는 'note'라는 테이블에서 데이터를 조회한다.
     * .select('*')는 이 테이블에서 모든 열을 선택하겠다는 의미
     * '*'는 모든 컬럼을 선택하라는 와일드카드
     * .ilike('title', %${search}%): title 열의 값이 search 문자열을 포함하는 레코드를 대소문자 구분 없이 검색
     * %는 SQL의 와일드카드로, search 문자열 앞뒤에 어떤 문자든 올 수 있음을 의미
     */
    const { data, error } = await supabase.from('note').select('*').ilike('title', `%${search}%`); // 'note'라는 필드에서 모든 필드를 가져오는 함수
    if (error) {
      alert(error.message)
      return;
    }
    setNotes(data); // 불러온 데이터를 'data'에 저장
  }

  useEffect(() => {
    fetchNotes();
  }, [])
  
  useEffect(() => {
    fetchNotes();
  }, [search])

  return (
    <div className="supabase-study-page">
      <Header />
      <div className="wrapper">
        <Sidebar notes={notes} activeNoteId={activeNoteId} setActiveNoteId={setActiveNoteId} setIsCreating={setIsCreating} search={search} setSearch={setSearch} />
        {
          isCreating ? <NewNote setIsCreating={setIsCreating} setActiveNoteId={setActiveNoteId} fetchNotes={fetchNotes} />
          : activeNoteId ? <NoteViewer setActiveNoteId={setActiveNoteId} fetchNotes={fetchNotes} note={notes.find((note) => note.id === activeNoteId)} />
          : <EmptyNote />
        }
      </div>
    </div>
  );
}

export default App;
