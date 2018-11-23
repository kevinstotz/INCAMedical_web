
//---------------------------------------------------//
// Create Template button functions

function createNote(note, type, company) {
  var note_obj = { "note": note, "type": { "id" : type }, "company": { "id" : company }  };

  API_POST(API_ENDPOINT + API_NOTE_CREATE, note_obj, createNoteSuccess, createNoteFailure, "json");
}

function createNoteSuccess(response) {
  getTemplateList(sessionStorage.getItem("companyId"));
}

function createNoteFailure(response) {
  console.log(response);
}
//---------------------------------------------------//
