var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mysql = require("mysql");
app.use(bodyParser.json()); // for å tolke JSON
const News = require("./dao/news.js");
const Category = require("./dao/category.js");
const Comment = require("./dao/comment.js");

var pool = mysql.createPool({
  connectionLimit: 2,
  host: "mysql.stud.iie.ntnu.no",
  user: "nikolard",
  password: "7CTLHdCQ",
  database: "nikolard",
  debug: false
});

let news = new News(pool);
let category = new Category(pool);
let comment = new Comment(pool);

require("./router.js")(app, pool, news, category, comment);

var htmlPath = __dirname + "/build";
app.use(express.static(htmlPath));

var server = app.listen(8080);
