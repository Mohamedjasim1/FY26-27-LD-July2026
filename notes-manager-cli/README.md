# Notes Manager CLI

A simple Node.js Command Line Interface (CLI) application to manage personal notes stored locally in JSON files.

## Project Structure

```text
notes-manager-cli/
│
├── data/
│   └── notes.json
│
├── src/
│   ├── app.js
│   ├── noteManager.js
│   └── storage.js
│
├── package.json
└── README.md
```

## Running the Application

To start the Notes Manager CLI, run the following command in your terminal:

```bash
npm start
```

When you launch the app, you will be presented with interactive menu options:

```text
=================================
       NOTES MANAGER CLI         
=================================
1. View all notes
2. View a specific note
3. Search notes
4. Edit a note
5. Add a note
6. Exit
=================================
Select an option (1-6):
```
