const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/notes.json');

function loadNotes() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }
    const dataBuffer = fs.readFileSync(DATA_FILE, 'utf8');
    if (!dataBuffer.trim()) {
      return [];
    }
    return JSON.parse(dataBuffer);
  } catch (error) {
    console.error('Error reading notes storage file:', error.message);
    return [];
  }
}

function saveNotes(notes) {
  try {
    const jsonString = JSON.stringify(notes, null, 2);
    fs.writeFileSync(DATA_FILE, jsonString, 'utf8');
  } catch (error) {
    console.error('Error saving notes to storage file:', error.message);
  }
}

module.exports = {
  loadNotes,
  saveNotes
};
