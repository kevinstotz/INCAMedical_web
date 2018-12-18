
//---------------------------------------------------//
// Create Template button functions

function createNote(note, type) {
  var note_obj = { "note": note, "type": { "id" : type } };

  API_POST(API_ENDPOINT + API_NOTE_CREATE, note_obj, createNoteSuccess, createNoteFailure, "json");
}

function createNoteSuccess(response) {
  console.log(response);
}

function createNoteFailure(response) {
  console.log(response);
}
//---------------------------------------------------//
