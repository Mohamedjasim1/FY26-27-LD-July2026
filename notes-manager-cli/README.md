# Notes Manager CLI

A simple Node.js Command Line Interface (CLI) application that allows you to manage personal notes stored locally in JSON format.

## Project Structure

```text
notes-manager-cli/
│
├── data/
│   └── notes.json       # Local storage file where all notes are saved
│
├── src/
│   ├── app.js           # CLI entry point and interactive menu navigation
│   ├── noteManager.js   # Functions for managing note operations (Add, View, Edit, Delete, Search, Sort, Favorite)
│   ├── storage.js       # File reading and writing operations using fs and path
│   └── validator.js     # Input validation functions for IDs, titles, and user inputs
│
├── package.json
└── README.md
```

## How to Run the Application

Navigate into the project directory and start the CLI application:

```bash
cd notes-manager-cli
npm start
```

When launched, the application displays an interactive terminal menu:

```text
=================================
       NOTES MANAGER CLI         
=================================
1. View all notes
2. View a specific note
3. Search notes
4. Sort notes
5. Favorite / Pin a note
6. Edit a note
7. Delete a note
8. Add a note
9. Exit
=================================
Select an option (1-9):
```

---

## Features & Simple Examples

### 1. View All Notes
Lists every note currently stored in your local file. Pinned favorite notes display a `[★ FAVORITE]` badge!

**Example Terminal Output:**
```text
--- All Notes ---

[ID: 1] Shopping List  [★ FAVORITE]
Content:
Buy milk
Buy eggs
Buy bread
Created: 7/31/2026, 11:30:00 PM
---------------------------------
```

### 2. View a Specific Note
Allows you to retrieve and display full details of a single note by entering its unique ID number.

**Example Usage:**
- Enter Note ID: `1`
- Displays note details or tells you if the ID was not found.

### 3. Search Notes
Performs a keyword search across all note titles and body contents (case-insensitive).

**Example Usage:**
- Search keyword: `milk`
- Displays all matching notes containing the word "milk".

### 4. Sort Notes
Sorts your saved notes based on your preferred criteria:
1. By ID (Numerical order)
2. By Name (Alphabetical title order)
3. By Date Created (Chronological order)

**Example Usage:**
- Select Option `4` (**Sort notes**)
- Select sort criteria: `2` (By Name)
- Displays notes sorted alphabetically by title.

### 5. Favorite / Pin a Note
Toggles a note's favorite state by ID. Pinned notes display a `[★ FAVORITE]` star badge across all list views.

**Example Usage:**
- Select Option `5` (**Favorite / Pin a note**)
- Enter Note ID: `1`
- Message: `Success: Note #1 ("Shopping List") is now marked as Favorite ★!`

### 6. Edit a Note
Modifies an existing note by ID. You can enter a new title or new content. Leaving a field blank keeps the existing value.

**Example Usage:**
- Enter Note ID to edit: `1`
- Enter new Title (leave blank to keep "Shopping List"): `Weekend Groceries`
- Enter new Content (use '|' for new lines, or leave blank to keep existing): `Line 1 | Line 2`

### 7. Delete a Note
Removes a note permanently from storage after asking for confirmation (`y/n`).

**Example Usage:**
- Enter Note ID to delete: `1`
- Confirmation: `Are you sure you want to delete Note #1? (y/n): y`

### 8. Add a Note (Supports Multi-line Content)
Creates a new note with a title and content. Use the pipe character `|` to separate lines for multi-line notes.

**Example Usage:**
- Enter Note Title: `Grocery List`
- Enter Note Content (use '|' for new lines): `Buy milk | Buy eggs | Buy bread`

### 9. Input Validation & Error Checks
The application validates inputs to prevent errors:
- **Title Validation**: Requires titles to be between 3 and 50 characters long.
- **ID Validation**: Ensures entered IDs are valid positive integers.
- **Menu Choice Validation**: Guarantees selections are valid numbers between 1 and 9.
