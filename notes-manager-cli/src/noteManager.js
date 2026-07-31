const { loadNotes, saveNotes } = require('./storage');

function getNotes() {
  return loadNotes();
}

function getNoteById(id) {
  const notes = loadNotes();
  const numericId = parseInt(id, 10);
  return notes.find((note) => note.id === numericId) || null;
}

function addNote(title, content) {
  const notes = loadNotes();

  const newNote = {
    id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
    title: title.trim(),
    content: content.trim(),
    createdAt: new Date().toISOString()
  };

  notes.push(newNote);
  saveNotes(notes);

  return newNote;
}

module.exports = {
  getNotes,
  getNoteById,
  addNote
};
