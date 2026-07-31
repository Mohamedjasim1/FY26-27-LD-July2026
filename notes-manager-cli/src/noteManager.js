const { loadNotes, saveNotes } = require('./storage');

function getNotes() {
  return loadNotes();
}

function getNoteById(id) {
  const notes = loadNotes();
  const numericId = parseInt(id, 10);
  return notes.find((note) => note.id === numericId) || null;
}

function searchNotes(query) {
  const notes = loadNotes();
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) {
    return [];
  }
  return notes.filter((note) =>
    note.title.toLowerCase().includes(lowerQuery) ||
    note.content.toLowerCase().includes(lowerQuery)
  );
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

function updateNote(id, newTitle, newContent) {
  const notes = loadNotes();
  const numericId = parseInt(id, 10);
  const noteIndex = notes.findIndex((note) => note.id === numericId);

  if (noteIndex === -1) {
    return null;
  }

  if (newTitle && newTitle.trim()) {
    notes[noteIndex].title = newTitle.trim();
  }
  if (newContent && newContent.trim()) {
    notes[noteIndex].content = newContent.trim();
  }

  notes[noteIndex].updatedAt = new Date().toISOString();
  saveNotes(notes);

  return notes[noteIndex];
}

module.exports = {
  getNotes,
  getNoteById,
  searchNotes,
  addNote,
  updateNote
};
