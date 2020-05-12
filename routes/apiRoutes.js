
const express = require("express");
const fs = require("fs");
const path = require("path");
const util = require("util");


const router = express.Router();
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const DB_PATH = path.join(__dirname, "../db/db.json");

// gets the notes from file 
router.get("/notes", async function (req, res) {
    try {
        // gets the existing notes from file 
        const data = await readFileAsync(DB_PATH, "utf8");
        res.json(JSON.parse(data));
    }
    catch {
        console.log(error);
    }
});


router.post("/notes", async function (req, res) {
    try {
        // JSON object of the new note
        const newNote = req.body;
        
        const data = await readFileAsync(DB_PATH, "utf8");
        const notes = JSON.parse(data);
        
 
        if (notes.length > 0) {
            newNote.id = notes[notes.length - 1].id + 1;
        }
        else {
            newNote.id = 1;
        }

        notes.push(newNote);
        
        // write array with new note to file, overwriting the old array
        await writeFileAsync(DB_PATH, JSON.stringify(notes, null, "\t"));
        res.json(newNote)
    }
    catch {
        console.log(error);
    }
});


router.delete("/notes/:id", async function (req, res) {
    try {
        const deletedNoteID = parseInt(req.params.id);
        const data = await readFileAsync(DB_PATH, "utf8");
        const notes = JSON.parse(data);


        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id === deletedNoteID) {
                notes.splice(i, 1);
                break;
            }
        }

        await writeFileAsync(DB_PATH, JSON.stringify(notes, null, "\t"));
        res.json({ ok: true })
    }
    catch {
        console.log(error)
    }
});

module.exports = router;