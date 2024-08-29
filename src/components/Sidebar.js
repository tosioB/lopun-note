function Sidebar({ notes, activeNoteId, setActiveNoteId, setIsCreating, search, setSearch }) {
  return (
    <>
      <aside className="sidebar">
        <button className="btn new-note-btn" onClick={() => {setIsCreating(true)}}>새로운 노트</button>
        <input type="text" className="search-inp" placeholder="노트를 검색해보세요." value={search} onChange={(e) => setSearch(e.target.value)} />
        <ul className="note-list">
          {
            notes.map((note) => {
              return (
                <li key={note.id}>
                  <button
                    className={`${activeNoteId === note.id ? 'btn note-btn active' : 'btn note-btn'}`}
                    onClick={() => {
                      setActiveNoteId(note.id);
                      setIsCreating(false);
                    }}
                  >
                    {note.title}
                  </button>
                </li>
              )
            })
          }
        </ul>
      </aside>
      
    </>
  )
}

export default Sidebar;