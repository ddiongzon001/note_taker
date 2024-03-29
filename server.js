// Dependencies
const connection = require("./connection.js");
const express = require("express");
const path = require("path");

// set up the express app
const app = express();
const PORT = process.env.PORT || 8000;

// set up the express app to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

// ROUTES
// API routes

// * Retrieving all notes from the database and returning them to the user as JSON.
app.get("/api/see_notes", function(req, res){
    let queryString = `SELECT * FROM notes`;
    connection.query(queryString, function(err, data){
        if (err) {
            return res.status(500).end();
        };
        res.json(data);
    })
});

// * Saving a new note to the database using the data passed on `req.body`.
app.post("/api/save_note", function(req, res){
    let newNote = req.body;

    console.log(newNote);

    let queryString = `INSERT INTO notes (title, body) VALUES (?, ?)`;

    connection.query(queryString, [newNote.title, newNote.body],function(err, data){
        if (err) throw err;
        console.log("new note has been saved")
    })
})

// * Deleting a note from the database using `req.params.id`.
app.delete("/api/delete_note/:id", function(req, res){
    let deleteNoteID = req.params.id;

    console.log(deleteNoteID);

    let queryString = `DELETE FROM notes WHERE id = ?`;

    connection.query(queryString, [deleteNoteID], function(err, data){
        if (err){
            return res.status(500).end();
        };
        console.log("your note has been deleted")
    })
})

// updating a note from the database
app.put("/api/update_note/:id", function(req, res){
    let updatedNoteID = req.params.id;
    let updatedNoteTitle = req.body.title;
    let updatedNoteBody = req.body.body;

    console.log(updatedNoteID);

    let queryString = `UPDATE notes SET title = ?, body = ? WHERE id = ?`;

    connection.query(queryString, [updatedNoteTitle, updatedNoteBody, updatedNoteID], function(err, data){
        if (err){
            return res.status(500).end();
        };
        console.log("your note has been updated")
    })
})

// main page
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"));
}) 

// note page
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "notes.html"));
})



// LISTENER
app.listen(PORT, function() {
    console.log(`App listening on http://localhost:${PORT}`);
  });
  