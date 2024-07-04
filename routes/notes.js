import * as Note from ".././model/note.js";

export async function list(req, res) {
  let { sort } = req.query;
  sort = sort ? sort.toLowerCase() : "desc";
  if (!(sort === "asc" || sort === "desc")) {
    return res.status(400).send("Invalid sort Params");
  }
  const notes = await Note.getNotes(sort);
  console.log(notes);
  return res.json(notes);
}

export async function create(req, res) {
  const { title, body } = req.body;
  console.log(req.body)
  if (title === undefined || body === undefined) {
    return res.status(400).send("Missing title or body");
  }
  const note = await Note.createNote({ title, body });
  console.log("created new note :", note);
  res.json(note);
}

export async function read(req, res) {
  const { id } = req.params;
  const note = await Note.getNote(id);
  console.log("the note that you want :", note);
  res.json(note);
}

export async function update(req, res) {
  const { id } = req.params;
  console.log(req.body)
  const { title, body } = req.body;
  if (title === undefined && body === undefined) {
    return res.status(400).send("Missing title or body");
  }
  const note = await Note.updateNote(id, { title, body });
  console.log(note);
  res.send("ok");
}

export async function deleteNote(req, res) {
  const { id } = req.params;
  console.log(`deleting ${id}`);
  const note = await Note.deleteNote(id);
  console.log(note);
  res.send("ok");
}
