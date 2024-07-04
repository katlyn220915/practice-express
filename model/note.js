// import MapStore from ".././lib/mapstore.js";
import { v4 as uuid } from "uuid";
import * as db from "../util/database.js";

// const NOTES = new Map();
// const store = new MapStore("note.json");

//data structure
/*
NOTES = {
  id: string,
  title: string,
  body: string,
  lastEdited: Date
}
*/

// store
//   .read()
//   .then((notes) => {
//     for (let [id, note] of notes) {
//       NOTES.set(id, note);
//     }
//   })
//   .catch((err) => {
//     console.error(err);
//   });

export async function getNotes(sort) {
  const notes = await db.getNotes(sort);
  return notes;
}

export async function createNote({ title, body }) {
  const id = uuid();
  const note = await db.createNote(id, title, body);
  return note;
}

export async function updateNote(id, { title, body }) {
  const note = await db.updateNote(id, title, body);
  return note;
}

export async function getNote(id) {
  const note = await db.getNote(id);
  if (!note) return null;
  return note;
}

export async function deleteNote(id) {
  const currentNoteList = db.deleteNote(id);
  return currentNoteList;
}
