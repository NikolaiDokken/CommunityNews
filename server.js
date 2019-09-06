var express = require("express");
var app = express();
var mysql = require("mysql");

var pool = mysql.createPool( {
    connectionLimit: 2,
    host: "mysql.stud.iie.ntnu.no",
    user: "nikolard",
    password: "bLa7Qdy7",
    database: "nikolard",
    debug: false
})

// eksempel 1 hello world
app.get("/hello", (req, res) => {
    res.send("Hello World");
});

// eksempel 2 JSON
app.get("/hello2", (req, res) => {
    res.json({ message: "Hello world sent with JSON" });
});

// eksempel 3 MySQL
app.get("/person"

var server = app.listen(8080);
