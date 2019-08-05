// Dependencies
const connection = require("./connection.js");
const express = require("express");
const path = require("path");

// set up the express app
const app = express();
const PORT = process.env.PORT || 3000;

// set up the express app to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json);

