const express = require("express");
const fs = require("fs");
const path = require("path");
const util = require("util");

const db_path = path.join(__dirname, "../db/db.json");
const router = express.Router();

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


router.get("/notes", async function (req, res) {
    try { 
        res.json(JSON.parse(await readFile(db_path, "utf8")));
    }
    catch {
        console.log(error);
    }
});

router.delete("/notes/:id", async function (req, res) {
    try {
        const notes = JSON.parse(await readFile(db_path, "utf8"));

        for (let i = 0; i < notes.length; i++) {
            const deletedID = parseInt(req.params.id);
            if (notes[i].id === deletedID) {
                notes.splice(i, 1);
                break;
            }
        }

        await writeFile(db_path, JSON.stringify(notes, null));
        res.json({ ok: true })
    }
    catch {
        console.log(error)
    }
});

router.post("/notes", async function (req, res) {
    try {
        const newGuy = req.body;
        const notes = JSON.parse(await readFile(db_path, "utf8"));
        
 
        if (notes.length > 0) {
            newGuy.id = notes[notes.length - 1].id + 1;
        }
        else {
            newGuy.id = 1;
            console.log("first note added")
        }

        notes.push(newGuy);
       
        await writeFile(db_path, JSON.stringify(notes, null));
        res.json(newGuy)
    }
    catch {
        console.log(error);
    }
});




module.exports = router;