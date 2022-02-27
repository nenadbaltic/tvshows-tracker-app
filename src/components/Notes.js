import React from "react";

const Notes = ({ notes, addingNote, id }) => {
  const addNote = () => {
    const noteElement = document.querySelector(".note");
    const note = noteElement.value;
    if (note.trim()) {
      const username = localStorage.getItem("username");
      const notesLocal = JSON.parse(localStorage.getItem("notes")) || [];
      notesLocal.push({ note, username, id: id });
      localStorage.setItem("notes", JSON.stringify(notesLocal));
      const filteredNotes = notesLocal.filter((note) => note.id === id);
      addingNote(filteredNotes);
      noteElement.value = "";
    }
  };

  return (
    <div className="notes">
      <h4>Add a note</h4>
      <div className="note-form">
        <textarea className="note"></textarea>
        <button onClick={addNote}>Add a note</button>
      </div>
      {notes.length > 0 && (
        <ul className="notes-list">
          <h3>Notes</h3>
          {notes.map((note, idx) => {
            return (
              <li key={idx}>
                <h5>{note.username}</h5>
                <p>{note.note}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Notes;
