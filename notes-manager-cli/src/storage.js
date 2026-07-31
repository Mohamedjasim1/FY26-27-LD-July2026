const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

function getStorageFilePath(username) {
  const safeUser = (username || 'default').toLowerCase().trim();
  return path.join(DATA_DIR, `notes_${safeUser}.json`);
}

function loadNotes(username) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    const dataFile = getStorageFilePath(username);

    if (!fs.existsSync(dataFile)) {
      return [];
    }
    const dataBuffer = fs.readFileSync(dataFile, 'utf8');
    if (!dataBuffer.trim()) {
      return [];
    }
    return JSON.parse(dataBuffer);
  } catch (error) {
    console.error('Error reading notes storage file:', error.message);
    return [];
  }
}

function saveNotes(username, notes) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    const dataFile = getStorageFilePath(username);
    const jsonString = JSON.stringify(notes, null, 2);
    fs.writeFileSync(dataFile, jsonString, 'utf8');
  } catch (error) {
    console.error('Error saving notes to storage file:', error.message);
  }
}

module.exports = {
  loadNotes,
  saveNotes
};
