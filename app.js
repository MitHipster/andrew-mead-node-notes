// const fs = require('fs');
// const _ = require('lodash');

// const notes = require('./notes');

let command = process.argv[2];
console.log('==>: process.argv', process.argv);

switch (command) {
case 'add':
	console.log('Add new note');
	break;
case 'remove':
	console.log('Remove a note');
	break;
case 'list':
	console.log('List all notes');
	break;
case 'read':
	console.log('Read a note');
	break;

default:
	console.log('Command not recognized');
	break;
}
