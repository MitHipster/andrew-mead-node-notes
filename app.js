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
	command: ['add2', 'a'],
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

const argv = yargs
	.command('add', 'Add a new note', {
		title: titleOptions,
		body: bodyOptions
	})
	.command('remove', 'Remove a note', {
		title: titleOptions
	})
	.command('list', 'List all notes')
	.command('read', 'Display a note', {
		title: titleOptions
	})
	.help().argv;
const command = argv._[0];

switch (command) {
case 'remove': {
	const removed = notes.removeNote(argv.title);

	if (removed) {
		console.info(chalk.green('\nYour note was successfully removed.\n'));
		console.info(chalk.blue('Title: '), argv.title);
	} else {
		errorMessage();
	}

	break;
}

case 'list': {
	const allNotes = notes.getAll();

	console.info(chalk.blue(`\nPrinting ${allNotes.length} note(s)...\n`));

	allNotes.forEach(note => displayNote(note));

	break;
}

case 'read': {
	const note = notes.getNote(argv.title);

	if (note) {
		console.info(chalk.green('\nYour note was successfully found.\n'));
		displayNote(note);
	} else {
		errorMessage();
	}

	break;
}

default:
	console.warn(chalk.bgRed('\nCommand not recognized'));

	break;
}

yargs.parse();
