# Notes Manager CLI

A simple Node.js Command Line Interface (CLI) application that allows you to manage personal notes stored locally in JSON format with multi-user profile support.

## Project Structure

```text
notes-manager-cli/
│
├── data/
│   ├── notes_john.json    # Isolated storage file for user "john"
│   └── notes_sarah.json   # Isolated storage file for user "sarah"
│
├── src/
│   ├── app.js           # CLI entry point, user profile login & menu navigation
│   ├── noteManager.js   # Functions for managing note operations (Add, View, Edit, Delete, Search, Sort, Favorite)
│   ├── storage.js       # File reading and writing operations for user-specific JSON files
│   └── validator.js     # Input validation functions for usernames, IDs, titles, and inputs
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

When launched, the application prompts you to enter your username:

```text
=================================
       NOTES MANAGER CLI         
=================================
Enter your Username: john

Welcome, JOHN! Your notes profile is loaded.

=================================
  NOTES MANAGER CLI [User: JOHN]
=================================
1. Add a note
2. View all notes
3. View a specific note
4. Search notes
5. Sort notes
6. Edit a note
7. Favorite / Pin a note
8. Delete a note
9. Switch User
10. Exit
=================================
Select an option (1-10):
```

---

## Features & Simple Examples

### 1. Clean Terminal UX ("Press Enter to Return")
After completing any action (viewing, searching, adding, editing, or deleting notes), the CLI cleanly pauses with:
`Press Enter to return to the main menu...`
This gives you full control to read outputs without the main menu cluttering your terminal screen.

### 2. Multi-User Profiles & Isolated Data
Each user's notes are saved in a separate JSON file (`data/notes_<username>.json`). Users can only view, edit, search, and delete their own notes.

**Example Usage:**
- Enter Username: `john`
- All created notes will be stored exclusively in `data/notes_john.json`.
- Select Option `9` (**Switch User**) to log in as a different user (e.g. `sarah`).

### 3. Add a Note (Unique ID & Bullet List Support)
Creates a new note under your active user profile.
- **Unique Safe ID Generation**: Uses `Math.max()` to guarantee unique incremental IDs even after notes are sorted or deleted out of order.
- Use pipe `|` to separate lines for multi-line notes.
- Start a line with `*` (asterisk) to format it as a bulleted list item (`•`).

**Example Usage:**
- Enter Note Title: `Grocery List`
- Enter Note Content: `* Buy milk | * Buy eggs | * Buy bread`

### 4. View All Notes
Lists every note currently stored in your user profile. Pinned favorite notes display a `[★ FAVORITE]` badge!

**Example Terminal Output:**
```text
--- All Notes ---

[ID: 1] Shopping List  [★ FAVORITE]
Content:
  • Buy milk
  • Buy eggs
  • Buy bread
Created: 7/31/2026, 11:30:00 PM
---------------------------------
```

### 5. View a Specific Note
Allows you to retrieve and display full details of a single note by entering its unique ID number.

### 6. Search Notes
Performs a keyword search across all note titles and body contents (case-insensitive).

### 7. Sort Notes
Sorts your saved notes based on your preferred criteria:
1. By ID (Numerical order)
2. By Name (Alphabetical title order)
3. By Date Created (Chronological order)

### 8. Edit a Note (With Interactive Re-Prompting)
Modifies an existing note by ID. You can enter a new title or new content. Leaving a field blank keeps the existing value.
If you enter an invalid title length (e.g. less than 3 characters), the app warns you and immediately re-prompts for the title without discarding your progress.

### 9. Favorite / Pin a Note
Toggles a note's favorite state by ID. Pinned notes display a `[★ FAVORITE]` star badge across all list views.

### 10. Delete a Note
Removes a note permanently from your profile after asking for confirmation (`y/n`).

### 11. Input Validation & Error Checks
The application validates inputs to prevent errors:
- **Username Validation**: 2 to 20 alphanumeric characters (`john`, `sarah_dev`).
- **Title Validation**: Requires titles to be between 3 and 50 characters long.
- **ID Validation**: Ensures entered IDs are valid positive integers.
- **Menu Choice Validation**: Guarantees selections are valid numbers between 1 and 10.
