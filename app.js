// const fs = require('fs');
// const _ = require('lodash');
const yargs = require('yargs');
const chalk = require('chalk');

const notes = require('./notes');

const argv = yargs.argv;
const command = argv._[0];
console.log('==>: argv', argv);

const displayNote = note => {
	console.info(chalk.blue('Title: '), note.title);
	console.info(chalk.blue('Body: '), note.body);
};

const errorMessage = () => {
	console.warn(
		chalk.red('\nA note with this title does not exist. Please try again.')
	);
};

switch (command) {
case 'add': {
	const note = notes.addNote(argv.title, argv.body);

	if (note) {
		console.info(chalk.green('\nYour note was successfully added.\n'));
		displayNote(note);
	} else {
		console.warn(
			chalk.red('\nA note with this title already exists. Please try again.')
		);
	}
	break;
}

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

case 'list':
	notes.getAll();
	break;
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
	console.log('==>: Command not recognized');
	break;
}
