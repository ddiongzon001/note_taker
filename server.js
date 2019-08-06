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

// ROUTES
// API routes

// * Retrieving all notes from the database and returning them to the user as JSON.
app.get("/api/see_notes", function(req, res){
    let queryString = `SELECT * FROM notes`;
    connection.query(queryString, function(err, data){
        if (err) throw err;
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

// LISTENER
app.listen(PORT, function() {
    console.log(`App listening on http://localhost:${PORT}`);
  });
  