const express = require("express");
const NoteController = require("../controllers/noteController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/notes", authMiddleware, NoteController.getNotes); 
router.post("/note", authMiddleware, NoteController.createNote);
router.put("/note/:id", authMiddleware, NoteController.updateNote);
router.delete("/notes/:id", NoteController.deleteNote);

module.exports = router;
