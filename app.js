const yargs = require('yargs'),
	chalk = require('chalk');

const notes = require('./notes');

// Helper functions
const displayNote = note => {
	console.info(chalk.blue('Title: '), note.title);
	console.info(chalk.blue('Body: '), note.body, '\n');
};

const errorMessage = () => {
	console.warn(chalk.red('\nA note with this title does not exist. Please try again.'));
};

// Specifies requirements for note title and body
const titleOptions = {
		alias: 't',
		describe: 'Title of note',
		demandOption: true,
		type: 'string'
	},
	bodyOptions = {
		alias: 'b',
		describe: 'Body of note',
		demandOption: true,
		type: 'string'
	};

// Create add note command
yargs.command({
	command: ['add', 'a'],
	describe: 'Add a new note',
	builder: {
		title: titleOptions,
		body: bodyOptions
	},
	handler: argv => {
		const note = notes.addNote(argv.title, argv.body);

		if (note) {
			console.info(chalk.green('\nYour note was successfully added.\n'));
			displayNote(note);
		} else {
			console.warn(chalk.red('\nA note with this title already exists. Please try again.'));
		}
	}
});

// Create delete note command
yargs.command({
	command: ['delete', 'd'],
	describe: 'Delete a note',
	builder: {
		title: titleOptions
	},
	handler: argv => {
		const deleted = notes.deleteNote(argv.title);

		if (deleted) {
			console.info(chalk.green('\nYour note was successfully deleted.\n'));
			console.info(chalk.blue('Title: '), argv.title);
		} else {
			errorMessage();
		}
	}
});

// Create list notes command
yargs.command({
	command: ['list', 'l'],
	describe: 'List all notes',
	handler: () => {
		const allNotes = notes.listNotes();

		console.info(chalk.blue(`\nPrinting ${allNotes.length} note(s)...\n`));

		allNotes.forEach(note => displayNote(note));
	}
});

// Create read note command
yargs.command({
	command: ['read', 'r'],
	describe: 'Read a note',
	builder: {
		title: titleOptions
	},
	handler: argv => {
		const note = notes.readNote(argv.title);

		if (note) {
			console.info(chalk.green('\nYour note was successfully found.\n'));
			displayNote(note);
		} else {
			errorMessage();
		}
	}
});

// Parse arguments to yargs command calls
yargs.parse();
