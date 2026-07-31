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

function getSortedNotes(sortBy) {
  const notes = loadNotes();
  const copy = [...notes];

  if (sortBy === 'id') {
    return copy.sort((a, b) => a.id - b.id);
  } else if (sortBy === 'name') {
    return copy.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === 'created') {
    return copy.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }
  return copy;
}

function addNote(title, content) {
  const notes = loadNotes();
  const formattedContent = content
    .split('|')
    .map((line) => line.trim())
    .join('\n');

  const newNote = {
    id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
    title: title.trim(),
    content: formattedContent,
    isFavorite: false,
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
    notes[noteIndex].content = newContent
      .split('|')
      .map((line) => line.trim())
      .join('\n');
  }

  notes[noteIndex].updatedAt = new Date().toISOString();
  saveNotes(notes);

  return notes[noteIndex];
}

function toggleFavoriteNote(id) {
  const notes = loadNotes();
  const numericId = parseInt(id, 10);
  const noteIndex = notes.findIndex((note) => note.id === numericId);

  if (noteIndex === -1) {
    return null;
  }

  notes[noteIndex].isFavorite = !notes[noteIndex].isFavorite;
  notes[noteIndex].updatedAt = new Date().toISOString();
  saveNotes(notes);

  return notes[noteIndex];
}

function deleteNote(id) {
  const notes = loadNotes();
  const numericId = parseInt(id, 10);
  const initialLength = notes.length;
  const filteredNotes = notes.filter((note) => note.id !== numericId);

  if (filteredNotes.length === initialLength) {
    return false;
  }

  saveNotes(filteredNotes);
  return true;
}

module.exports = {
  getNotes,
  getNoteById,
  searchNotes,
  getSortedNotes,
  addNote,
  updateNote,
  toggleFavoriteNote,
  deleteNote
};
