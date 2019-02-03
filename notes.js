console.log('==>: Starting notes.js');

let addNote = (title, body) => {
	console.log('==>: addNote -> title', title);
	console.log('==>: addNote -> body', body);
};

let removeNote = title => {
	console.log('==>: removeNote -> title', title);
};

let getAll = () => {
	console.log('==>: Getting all notes');
};

let getNote = title => {
	console.log('==>: getNote -> title', title);
};

module.exports = {
	addNote,
	removeNote,
	getAll,
	getNote
};
