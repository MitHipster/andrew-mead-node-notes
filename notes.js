console.log('==>: Starting notes.js');

const fs = require('fs');
const chalk = require('chalk');

const notesFile = 'notes_data.json';

const fetchNotes = () => {
	// Will catch if file does not exist or data from file is invalid
	try {
		const notesString = fs.readFileSync(notesFile);
		return JSON.parse(notesString);
	} catch (e) {
		console.info(chalk.blue('Creating a new file and/or dataset.'));
		return [];
	}
};

const saveNotes = notes => {
	fs.writeFileSync(notesFile, JSON.stringify(notes));
};

const addNote = (title, body) => {
	const notes = fetchNotes(),
		note = { title, body },
		// Check notes array for duplicate title
		duplicateNotes = notes.filter(note => note.title === title);

	// Update notes array if title is unique and write back to file
	if (duplicateNotes.length === 0) {
		notes.push(note);
		saveNotes(notes);
		return note;
	}
};

const removeNote = title => {
	const notes = fetchNotes(),
		// Filter out note with matching title
		remainingNotes = notes.filter(note => note.title !== title);

	saveNotes(remainingNotes);

	// Return either true or false if a note was removed
	return notes.length !== remainingNotes.length;
};

const getAll = () => {
	console.log('==>: Getting all notes');
};

const getNote = title => {
	console.log('==>: getNote -> title', title);
};

module.exports = {
	addNote,
	removeNote,
	getAll,
	getNote
};
