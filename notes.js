console.log('==>: Starting notes.js');

const fs = require('fs');
const notesFile = 'notes_data.json';

const addNote = (title, body) => {
	let notes = [];
	const note = { title, body };

	// Will catch if file does not exist or data from file is invalid
	try {
		const notesString = fs.readFileSync(notesFile);
		notes = JSON.parse(notesString);
	} catch (e) {
		console.info('Creating a new file and/or dataset.');
	}

	// Check notes array for duplicate title
	let duplicateNotes = notes.filter(note => note.title === title);

	// Update notes array if title is unique and write back to file
	if (duplicateNotes.length === 0) {
		notes.push(note);
		fs.writeFileSync(notesFile, JSON.stringify(notes));
	} else {
		console.warn('A note with this title already exists. Please try again.');
	}
};

const removeNote = title => {
	console.log('==>: removeNote -> title', title);
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
