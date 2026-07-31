const readline = require('readline');
const { addNote, getNotes, getNoteById } = require('./noteManager');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMainMenu() {
  console.log('\n=================================');
  console.log('       NOTES MANAGER CLI         ');
  console.log('=================================');
  console.log('1. View all notes');
  console.log('2. View a specific note');
  console.log('3. Add a note');
  console.log('4. Exit');
  console.log('=================================');

  rl.question('Select an option (1-4): ', (choice) => {
    switch (choice.trim()) {
      case '1':
        viewAllNotes();
        break;
      case '2':
        promptViewNote();
        break;
      case '3':
        promptAddNote();
        break;
      case '4':
        console.log('\nGoodbye!');
        rl.close();
        break;
      default:
        console.log('\nInvalid option. Please try again.');
        showMainMenu();
        break;
    }
  });
}

function viewAllNotes() {
  const notes = getNotes();

  console.log('\n--- All Notes ---');
  if (notes.length === 0) {
    console.log('No notes found. Select option 3 to create one!');
  } else {
    notes.forEach((note) => {
      console.log(`\n[ID: ${note.id}] ${note.title}`);
      console.log(`Content: ${note.content}`);
      console.log(`Created: ${new Date(note.createdAt).toLocaleString()}`);
      console.log('---------------------------------');
    });
  }

  showMainMenu();
}

function promptViewNote() {
  console.log('\n--- View a Specific Note ---');
  rl.question('Enter Note ID: ', (idInput) => {
    const note = getNoteById(idInput.trim());

    if (!note) {
      console.log(`\nNote with ID ${idInput.trim()} not found.`);
    } else {
      console.log(`\n=================================`);
      console.log(`ID: ${note.id}`);
      console.log(`Title: ${note.title}`);
      console.log(`Content: ${note.content}`);
      console.log(`Created: ${new Date(note.createdAt).toLocaleString()}`);
      console.log(`=================================`);
    }

    showMainMenu();
  });
}

function promptAddNote() {
  console.log('\n--- Add a New Note ---');
  rl.question('Enter Note Title: ', (title) => {
    if (!title.trim()) {
      console.log('Note title cannot be empty.');
      return showMainMenu();
    }

    rl.question('Enter Note Content: ', (content) => {
      const createdNote = addNote(title, content);
      console.log(`\nSuccess: Note #${createdNote.id} ("${createdNote.title}") created successfully!`);
      showMainMenu();
    });
  });
}

console.log('Welcome to Notes Manager CLI!');
showMainMenu();
