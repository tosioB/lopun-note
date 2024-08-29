import { useState } from "react";
import { supabase } from "../utils/supabase";

function NewNote({ setIsCreating, setActiveNoteId, fetchNotes }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSave = async () => {
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    /** supabase
     * .from('note')는 'note'라는 테이블에서 데이터를 조회
     * .insert([...]): 배열 형태로 삽입할 데이터를 지정
     * 각 객체는 테이블의 열과 그에 대한 값을 정의
     * { title, content }: title과 content라는 변수를 사용하여 새로운 레코드를 삽입
     * data는 삽입된 데이터의 정보를 포함하고, error는 삽입 중에 발생한 오류를 포함
     */
    const { data, error } = await supabase.from('note').insert({
      title,
      content
    })
    .select();
    console.log(data);

    if (error) {
      alert(error.message)
      return;
    }

    /** 
     * 데이터가 추가되면 추가된 상태의 데이터를 다시 불러와서
     * 화면에 업데이트를 해야하기 떄문에 데이터가 생성될 때마다
     * App.js의 fetchNotes()를 한번 더 호출해준다.
    */
    await fetchNotes(); 
    setActiveNoteId(data[0].id)
    setIsCreating(false);
  }

  return (
    <div className="note-component">
      <input type="text" placeholder="노트의 제목을 입력하세요." value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      
      <div className="btn-box">
        <button className="btn save-btn" onClick={() => onSave()}>저장</button>
      </div>
    </div>
  )
}

export default NewNote;