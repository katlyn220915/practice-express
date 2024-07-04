import * as Note from ".././model/note.js";

export async function list(req, res) {
  let { sort } = req.query;
  sort = sort ? sort.toLowerCase() : "desc";
  if (!(sort === "asc" || sort === "desc")) {
    return res.status(400).send("Invalid sort Params");
  }
  const notes = await Note.getNotes(sort);
  return res.json(notes);
}

export async function create(req, res) {
  const { title, body } = req.body;
  if (title === undefined || body === undefined) {
    return res.status(400).send("Missing title or body");
  }
  const note = await Note.createNote({ title, body });
  res.json(note);
}

export async function read(req, res) {
  const { id } = req.params;
  const note = await Note.getNote(id);
  res.json(note);
}

export async function update(req, res) {
  const { id } = req.params;
  const { title, body } = req.body;
  if (title === undefined && body === undefined) {
    return res.status(400).send("Missing title or body");
  }
  const note = await Note.updateNote(id, { title, body });
  res.send("ok");
}

export async function deleteNote(req, res) {
  const { id } = req.params;
  const note = await Note.deleteNote(id);
  res.send("ok");
}
