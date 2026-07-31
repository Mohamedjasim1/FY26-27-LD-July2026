const readline = require('readline');
const { addNote, getNotes, getNoteById, searchNotes, getSortedNotes, updateNote, toggleFavoriteNote, deleteNote } = require('./noteManager');
const { isValidId, isValidTitle, isValidContent, isValidChoice, isValidUsername } = require('./validator');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let currentUser = '';

function getTitleWithBadge(note) {
  return note.isFavorite ? `${note.title}  [★ FAVORITE]` : note.title;
}

function promptUserLogin() {
  console.log('\n=================================');
  console.log('       NOTES MANAGER CLI         ');
  console.log('=================================');
  rl.question('Enter your Username: ', (usernameInput) => {
    if (!isValidUsername(usernameInput)) {
      console.log('\nValidation Error: Username must be 2 to 20 characters long (letters, numbers, underscores, hyphens only).');
      return promptUserLogin();
    }

    currentUser = usernameInput.trim().toLowerCase();
    console.log(`\nWelcome, ${currentUser.toUpperCase()}! Your notes profile is loaded.`);
    showMainMenu();
  });
}

function showMainMenu() {
  console.log('\n=================================');
  console.log(`  NOTES MANAGER CLI [User: ${currentUser.toUpperCase()}]`);
  console.log('=================================');
  console.log('1. Add a note');
  console.log('2. View all notes');
  console.log('3. View a specific note');
  console.log('4. Search notes');
  console.log('5. Sort notes');
  console.log('6. Edit a note');
  console.log('7. Favorite / Pin a note');
  console.log('8. Delete a note');
  console.log('9. Switch User');
  console.log('10. Exit');
  console.log('=================================');

  rl.question('Select an option (1-10): ', (choice) => {
    if (!isValidChoice(choice, 1, 10)) {
      console.log('\nInvalid option. Please enter a number between 1 and 10.');
      return showMainMenu();
    }

    switch (choice.trim()) {
      case '1':
        promptAddNote();
        break;
      case '2':
        viewAllNotes();
        break;
      case '3':
        promptViewNote();
        break;
      case '4':
        promptSearchNotes();
        break;
      case '5':
        promptSortNotes();
        break;
      case '6':
        promptEditNote();
        break;
      case '7':
        promptFavoriteNote();
        break;
      case '8':
        promptDeleteNote();
        break;
      case '9':
        promptUserLogin();
        break;
      case '10':
        console.log('\nGoodbye!');
        rl.close();
        break;
    }
  });
}

function viewAllNotes() {
  const notes = getNotes(currentUser);

  console.log('\n--- All Notes ---');
  if (notes.length === 0) {
    console.log('No notes found. Select option 1 to create one!');
  } else {
    notes.forEach((note) => {
      console.log(`\n[ID: ${note.id}] ${getTitleWithBadge(note)}`);
      console.log(`Content:\n${note.content}`);
      console.log(`Created: ${new Date(note.createdAt).toLocaleString()}`);
      if (note.updatedAt) {
        console.log(`Updated: ${new Date(note.updatedAt).toLocaleString()}`);
      }
      console.log('---------------------------------');
    });
  }

  showMainMenu();
}

function promptViewNote() {
  console.log('\n--- View a Specific Note ---');
  rl.question('Enter Note ID: ', (idInput) => {
    if (!isValidId(idInput)) {
      console.log('\nValidation Error: ID must be a valid positive integer.');
      return showMainMenu();
    }

    const note = getNoteById(currentUser, idInput.trim());

    if (!note) {
      console.log(`\nNote with ID ${idInput.trim()} not found.`);
    } else {
      console.log(`\n=================================`);
      console.log(`ID: ${note.id}`);
      console.log(`Title: ${getTitleWithBadge(note)}`);
      console.log(`Content:\n${note.content}`);
      console.log(`Created: ${new Date(note.createdAt).toLocaleString()}`);
      if (note.updatedAt) {
        console.log(`Updated: ${new Date(note.updatedAt).toLocaleString()}`);
      }
      console.log(`=================================`);
    }

    showMainMenu();
  });
}

function promptSearchNotes() {
  console.log('\n--- Search Notes ---');
  rl.question('Enter search keyword: ', (query) => {
    if (!query || !query.trim()) {
      console.log('\nValidation Error: Search keyword cannot be empty.');
      return showMainMenu();
    }

    const results = searchNotes(currentUser, query);

    console.log(`\n--- Search Results for "${query.trim()}" ---`);
    if (results.length === 0) {
      console.log('No matching notes found.');
    } else {
      results.forEach((note) => {
        console.log(`\n[ID: ${note.id}] ${getTitleWithBadge(note)}`);
        console.log(`Content:\n${note.content}`);
        console.log(`Created: ${new Date(note.createdAt).toLocaleString()}`);
        if (note.updatedAt) {
          console.log(`Updated: ${new Date(note.updatedAt).toLocaleString()}`);
        }
        console.log('---------------------------------');
      });
    }

    showMainMenu();
  });
}

function promptSortNotes() {
  console.log('\n--- Sort Notes ---');
  console.log('Select sort criteria:');
  console.log('1. By ID');
  console.log('2. By Name (Title)');
  console.log('3. By Date Created');

  rl.question('Select an option (1-3): ', (choice) => {
    let sortBy = 'id';
    if (choice.trim() === '2') {
      sortBy = 'name';
    } else if (choice.trim() === '3') {
      sortBy = 'created';
    } else if (choice.trim() !== '1') {
      console.log('\nInvalid choice. Defaulting to sorting by ID.');
    }

    const notes = getSortedNotes(currentUser, sortBy);

    console.log(`\n--- Notes Sorted by ${sortBy.toUpperCase()} ---`);
    if (notes.length === 0) {
      console.log('No notes found. Select option 1 to create one!');
    } else {
      notes.forEach((note) => {
        console.log(`\n[ID: ${note.id}] ${getTitleWithBadge(note)}`);
        console.log(`Content:\n${note.content}`);
        console.log(`Created: ${new Date(note.createdAt).toLocaleString()}`);
        if (note.updatedAt) {
          console.log(`Updated: ${new Date(note.updatedAt).toLocaleString()}`);
        }
        console.log('---------------------------------');
      });
    }

    showMainMenu();
  });
}

function promptFavoriteNote() {
  console.log('\n--- Favorite / Pin a Note ---');
  rl.question('Enter Note ID: ', (idInput) => {
    if (!isValidId(idInput)) {
      console.log('\nValidation Error: ID must be a valid positive integer.');
      return showMainMenu();
    }

    const updated = toggleFavoriteNote(currentUser, idInput.trim());

    if (!updated) {
      console.log(`\nNote with ID ${idInput.trim()} not found.`);
    } else {
      const status = updated.isFavorite ? 'marked as Favorite ★' : 'unmarked as Favorite';
      console.log(`\nSuccess: Note #${updated.id} ("${updated.title}") is now ${status}!`);
    }

    showMainMenu();
  });
}

function promptEditNote() {
  console.log('\n--- Edit a Note ---');
  rl.question('Enter Note ID to edit: ', (idInput) => {
    if (!isValidId(idInput)) {
      console.log('\nValidation Error: ID must be a valid positive integer.');
      return showMainMenu();
    }

    const note = getNoteById(currentUser, idInput.trim());

    if (!note) {
      console.log(`\nNote with ID ${idInput.trim()} not found.`);
      return showMainMenu();
    }

    console.log(`Editing Note #${note.id}: "${note.title}"`);
    rl.question(`Enter new Title (leave blank to keep "${note.title}"): `, (newTitle) => {
      if (newTitle.trim() && !isValidTitle(newTitle)) {
        console.log('\nValidation Error: New title must be between 3 and 50 characters.');
        return showMainMenu();
      }

      rl.question(`Enter new Content (use '|' for new lines, '*' for list items, or leave blank to keep existing): `, (newContent) => {
        const updated = updateNote(currentUser, note.id, newTitle, newContent);
        console.log(`\nSuccess: Note #${updated.id} updated successfully!`);
        showMainMenu();
      });
    });
  });
}

function promptDeleteNote() {
  console.log('\n--- Delete a Note ---');
  rl.question('Enter Note ID to delete: ', (idInput) => {
    if (!isValidId(idInput)) {
      console.log('\nValidation Error: ID must be a valid positive integer.');
      return showMainMenu();
    }

    const noteId = idInput.trim();
    const note = getNoteById(currentUser, noteId);

    if (!note) {
      console.log(`\nNote with ID ${noteId} not found.`);
      return showMainMenu();
    }

    rl.question(`Are you sure you want to delete Note #${note.id} ("${note.title}")? (y/n): `, (confirm) => {
      const choice = confirm.trim().toLowerCase();
      if (choice === 'y' || choice === 'yes') {
        deleteNote(currentUser, noteId);
        console.log(`\nSuccess: Note #${noteId} deleted successfully!`);
      } else {
        console.log('\nDeletion cancelled.');
      }
      showMainMenu();
    });
  });
}

function promptAddNote() {
  console.log('\n--- Add a New Note ---');
  rl.question('Enter Note Title: ', (title) => {
    if (!isValidTitle(title)) {
      console.log('\nValidation Error: Title is required and must be between 3 and 50 characters.');
      return showMainMenu();
    }

    rl.question('Enter Note Content (use \'|\' for new lines, \'*\' for list items): ', (content) => {
      if (!isValidContent(content)) {
        console.log('\nValidation Error: Content cannot be empty.');
        return showMainMenu();
      }

      const createdNote = addNote(currentUser, title, content);
      console.log(`\nSuccess: Note #${createdNote.id} ("${createdNote.title}") created successfully!`);
      showMainMenu();
    });
  });
}

promptUserLogin();
