import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

function NoteViewer({ note, setActiveNoteId, fetchNotes }) {
  const [title, setTitle] = useState(note?.title);
  const [content, setContent] = useState(note?.content);
  const [isEditing, setIsEditing] = useState(false);

  const onEdit = async () => {
    /** supabase
     * supabase.from('note'): note라는 테이블을 선택
     * update({ title, content }): title과 content 필드를 업데이트
     * 여기서 title과 content는 변수로, 업데이트할 새 값을 담고 있어야 한다.
     * .eq('id', note.id): id가 note.id와 일치하는 레코드를 선택하여 업데이트
     * note.id는 업데이트할 레코드의 식별자
     */
    const { data, error } = await supabase
    .from('note')
    .update({
      title,
      content
    })
    .eq('id', note.id)
    // .select(); // 업데이트된 데이터를 조회

    if (error) {
      alert(error.message)
      return;
    }
    setIsEditing(false);
  }

  const onDelete = async () => {
    /** supabase
     * supabase.from('note'): note라는 테이블을 선택
     * .delete(): 레코드를 삭제
     * .eq('id', note.id): id가 note.id와 일치하는 레코드를 삭제합니다. note.id는 삭제할 레코드의 식별자
     */
    const { data, error } = await supabase
    .from('note')
    .delete()
    .eq('id', note.id)

    if (error) {
      alert(error.message)
      return;
    }
    setIsEditing(false);
    setActiveNoteId(null); // 삭제 후 setActiveNoteId(null)을 작성해서 버튼 활성화 해제
    fetchNotes();
  }

  useEffect(() => {
    setTitle(note?.title);
    setContent(note?.content);
    setIsEditing(false)
  }, [note])

  return (
    <div className="note-component">
      {
        isEditing ? 
        <>
          <input type="text" placeholder="노트의 제목을 입력하세요." value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </>
        :
        <>
          <h1 className="title">{title}</h1>
          <p className="content">{content}</p>
        </>
      }
      
      
      <div className="btn-box">
        {
          isEditing ?
          <>
            <button className="btn save-btn" onClick={() => {onEdit()}}>저장</button>
            <button className="btn del-btn" onClick={() => {onDelete()}}>삭제</button>
          </>
          :
          <button className="btn edit-btn" onClick={() => {setIsEditing(true)}}>수정하기</button>
        }
        
      </div>
    </div>
  )
}

export default NoteViewer;