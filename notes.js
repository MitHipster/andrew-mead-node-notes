const fs = require('fs'),
	chalk = require('chalk');

const notesFile = 'notes_data.json';

const fetchNotes = () => {
	// Will catch if file does not exist or data from file is invalid
	try {
		const notesString = fs.readFileSync(notesFile).toString();

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
		// Check notes array for duplicate title
		duplicateNotes = notes.filter(note => note.title === title);

	// Update notes array if title is unique and write back to file
	if (duplicateNotes.length === 0) {
		notes.push({ title, body });
		saveNotes(notes);

		return { title, body };
	}
};

const deleteNote = title => {
	const notes = fetchNotes(),
		// Filter out note with matching title
		remainingNotes = notes.filter(note => note.title !== title),
		isChanged = notes.length !== remainingNotes.length;

	if (isChanged) {
		console.log('Test');
		saveNotes(remainingNotes);
	}

	// Return either true or false if a note was deleted
	return isChanged;
};

const getAll = () => {
	return fetchNotes();
};

const getNote = title => {
	const notes = fetchNotes();

	// Return Filtered out note with matching title
	return notes.filter(note => note.title === title)[0];
};

module.exports = {
	addNote,
	deleteNote,
	getAll,
	getNote
};
