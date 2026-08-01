const { loadNotes, saveNotes } = require('./storage');

function getNotes(username) {
  return loadNotes(username);
}

function getNoteById(username, id) {
  const notes = loadNotes(username);
  const numericId = parseInt(id, 10);
  return notes.find((note) => note.id === numericId) || null;
}

function searchNotes(username, query, searchMode = 'all') {
  const notes = loadNotes(username);
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) {
    return [];
  }

  return notes.filter((note) => {
    if (searchMode === 'favorites' && !note.isFavorite) {
      return false;
    }
    const titleMatches = note.title.toLowerCase().includes(lowerQuery);
    const contentMatches = note.content.toLowerCase().includes(lowerQuery);
    return titleMatches || contentMatches;
  });
}

function getSortedNotes(username, sortBy) {
  const notes = loadNotes(username);
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

function formatContent(content) {
  return content
    .split('|')
    .map((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('*')) {
        return `  • ${trimmed.substring(1).trim()}`;
      }
      return trimmed;
    })
    .join('\n');
}

function addNote(username, title, content) {
  const notes = loadNotes(username);
  const formattedContent = formatContent(content);
  const maxId = notes.reduce((max, note) => (note.id > max ? note.id : max), 0);

  const newNote = {
    id: maxId + 1,
    title: title.trim(),
    content: formattedContent,
    isFavorite: false,
    createdAt: new Date().toISOString()
  };

  notes.push(newNote);
  saveNotes(username, notes);

  return newNote;
}

function updateNote(username, id, newTitle, newContent) {
  const notes = loadNotes(username);
  const numericId = parseInt(id, 10);
  const noteIndex = notes.findIndex((note) => note.id === numericId);

  if (noteIndex === -1) {
    return null;
  }

  if (newTitle && newTitle.trim()) {
    notes[noteIndex].title = newTitle.trim();
  }
  if (newContent && newContent.trim()) {
    notes[noteIndex].content = formatContent(newContent);
  }

  notes[noteIndex].updatedAt = new Date().toISOString();
  saveNotes(username, notes);

  return notes[noteIndex];
}

function toggleFavoriteNote(username, id) {
  const notes = loadNotes(username);
  const numericId = parseInt(id, 10);
  const noteIndex = notes.findIndex((note) => note.id === numericId);

  if (noteIndex === -1) {
    return null;
  }

  notes[noteIndex].isFavorite = !notes[noteIndex].isFavorite;
  notes[noteIndex].updatedAt = new Date().toISOString();
  saveNotes(username, notes);

  return notes[noteIndex];
}

function deleteNote(username, id) {
  const notes = loadNotes(username);
  const numericId = parseInt(id, 10);
  const initialLength = notes.length;
  const filteredNotes = notes.filter((note) => note.id !== numericId);

  if (filteredNotes.length === initialLength) {
    return false;
  }

  saveNotes(username, filteredNotes);
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
