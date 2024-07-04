import express from "express";
import * as notes from "./notes.js";
import * as user from "./user.js";
const router = express.Router();

router.get("/notes", notes.list);
router.post("/notes", notes.create);
router.get("/notes/:id", notes.read);
router.post("/notes/:id", notes.update);
router.delete("/notes/:id", notes.deleteNote);

router.post("/user/login", user.login)
router.post("/user/register", user.register)

router.get("/error", function (req, res) {
  throw new Error("I not a error message");
});

export default router;
