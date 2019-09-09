var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");
app.use(bodyParser.json());

var pool = mysql.createPool( {
    connectionLimit: 2,
    host: "mysql.stud.iie.ntnu.no",
    user: "nikolard",
    password: "7CTLHdCQ",
    database: "nikolard",
    debug: false
});

app.get("/saker", (req, res) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
        console.log("Koblet til databasen");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved oppkobling"});
        } else {
            connection.query(
                "SELECT * FROM sak",
                (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.json({ error: "error querying"});
                    } else {
                        console.log(rows);
                        res.json(rows);
                    }
                }
            );
        }
    });
});