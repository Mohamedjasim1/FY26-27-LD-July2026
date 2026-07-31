const readline = require('readline');

// Create readline interface for terminal I/O
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMainMenu() {
  console.log('\n=================================');
  console.log('       NOTES MANAGER CLI         ');
  console.log('=================================');
  console.log('1. View all notes (Coming soon)');
  console.log('2. Add a note (Coming soon)');
  console.log('3. Exit');
  console.log('=================================');

  rl.question('Select an option (1-3): ', (choice) => {
    switch (choice.trim()) {
      case '1':
      case '2':
        console.log('\nThis feature is under development.');
        showMainMenu();
        break;
      case '3':
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

// Start application
console.log('Welcome to Notes Manager CLI!');
showMainMenu();
