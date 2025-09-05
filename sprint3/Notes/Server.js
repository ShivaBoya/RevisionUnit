const fs = require("fs");
const path = require("path");

const FILE_PATH = path.join(__dirname, "notes.txt");

function ensureFile() {
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, "", "utf-8");
  }
}

function addNote(note) {
  ensureFile();
  fs.appendFileSync(FILE_PATH, note + "\n", "utf-8");
  console.log(" Note added successfully!");
}

function listNotes() {
  ensureFile();
  const data = fs.readFileSync(FILE_PATH, "utf-8").trim();
  if (!data) {
    console.log("No notes found.");
    return;
  }
  const notes = data.split("\n");
  console.log("Your Notes:");
  notes.forEach((note, index) => {
    console.log(`${index + 1}. ${note}`);
  });
}

function deleteNote(lineNumber) {
  ensureFile();
  const data = fs.readFileSync(FILE_PATH, "utf-8").trim();
  if (!data) {
    console.log("No notes found to delete.");
    return;
  }
  let notes = data.split("\n");
  if (lineNumber < 1 || lineNumber > notes.length) {
    console.log("Invalid note number!");
    return;
  }
  notes.splice(lineNumber - 1, 1);
  fs.writeFileSync(FILE_PATH, notes.join("\n"), "utf-8");
  console.log("Note deleted successfully!");
}

const command = process.argv[2];
const input = process.argv[3];

switch (command) {
  case "add":
    if (!input) {
      console.log("Please provide a note to add.");
    } else {
      addNote(input);
    }
    break;
  case "list":
    listNotes();
    break;
  case "delete":
    if (!input || isNaN(input)) {
      console.log("Please provide a valid note number to delete.");
    } else {
      deleteNote(Number(input));
    }
    break;
  default:
    console.log("Usage:");
    console.log('  node notesManager.js add "Your note here"');
    console.log("  node notesManager.js list");
    console.log("  node notesManager.js delete <note_number>");
}
