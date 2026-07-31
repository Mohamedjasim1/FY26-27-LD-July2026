const { loadNotes, saveNotes } = require('./storage');

/**
 * Adds a new note with title and content.
 * Generates an incrementing ID and timestamp.
 * @param {string} title - Note title
 * @param {string} content - Note body text
 * @returns {Object} Created note object
 */
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
  addNote
};
