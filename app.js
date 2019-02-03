// const fs = require('fs');
// const _ = require('lodash');
const yargs = require('yargs');
const chalk = require('chalk');

const notes = require('./notes');

const argv = yargs.argv;
const command = argv._[0];
console.log('==>: argv', argv);

switch (command) {
case 'add': {
	const note = notes.addNote(argv.title, argv.body);
	console.log('==>: note', note);
	if (note) {
		console.info(chalk.green('Your note was successfully added.\n'));
		console.info(chalk.blue('Title: '), note.title);
		console.info(chalk.blue('Body: '), note.body);
	} else {
		console.warn(
			chalk.red('A note with this title already exists. Please try again.')
		);
	}
	break;
}

case 'remove':
	notes.removeNote(argv.title);
	break;
case 'list':
	notes.getAll();
	break;
case 'read':
	notes.getNote(argv.title);
	break;

default:
	console.log('==>: Command not recognized');
	break;
}
