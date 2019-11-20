var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mysql = require("mysql");
app.use(bodyParser.json()); // for å tolke JSON
const NewsTest = require("../dao/news.js");

var pool = mysql.createPool({
  connectionLimit: 2,
  host: "mysql.stud.iie.ntnu.no",
  user: "nikolard",
  password: "7CTLHdCQ",
  database: "nikolard",
  debug: false
});

let newsTest = new NewsTest(pool);

require("./router.js")(app, pool);

var htmlPath = __dirname + "/build";
app.use(express.static(htmlPath));

var server = app.listen(8080);
