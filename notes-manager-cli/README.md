# Notes Manager CLI

A simple Node.js Command Line Interface (CLI) application to manage personal notes stored locally in JSON files.

## Project Structure

```text
notes-manager-cli/
│
├── data/
│   └── notes.json         # Local JSON storage file
│
├── src/
│   ├── app.js             # Entry point & CLI interactive menu
│   ├── noteManager.js     # Business logic for creating/managing notes
│   └── storage.js         # File I/O operations (read/write JSON)
│
├── package.json
└── README.md
```

## Functionality & Code Overview

### `src/storage.js`
Handles reading from and writing to the local `data/notes.json` file using Node.js `fs` and `path` modules.
* **`loadNotes()`**: Reads `data/notes.json` synchronously. Parses and returns the array of note objects. If the file is missing or empty, returns `[]`.
* **`saveNotes(notes)`**: Takes an array of note objects and writes it back to `data/notes.json` as formatted JSON.

### `src/noteManager.js`
Encapsulates business logic for notes management.
* **`getNotes()`**: Retrieves and returns all saved note objects from storage.
* **`getNoteById(id)`**: Searches and returns a specific note matching the given ID. Returns `null` if not found.
* **`addNote(title, content)`**: Loads existing notes, creates a new note object with an auto-incrementing `id`, trimmed `title`, trimmed `content`, and a `createdAt` ISO timestamp, appends it to the list, saves to storage, and returns the newly created note object.

### `src/app.js`
Main CLI entry point managing terminal interaction via `readline`.
* **`showMainMenu()`**: Displays interactive option menu to the user.
* **`viewAllNotes()`**: Fetches all notes using `getNotes()` and formats them clearly in the terminal.
* **`promptViewNote()`**: Prompts user for Note ID, retrieves details via `getNoteById(id)`, and displays note details or error message.
* **`promptAddNote()`**: Prompts user sequentially for Note Title and Content, validates input, calls `addNote()`, and displays confirmation.

## How to Run

```bash
npm start
```
