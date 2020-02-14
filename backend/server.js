var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mysql = require("mysql");
app.use(bodyParser.json()); // for å tolke JSON
const News = require("./dao/news.js");
const Category = require("./dao/category.js");
const Comment = require("./dao/comment.js");
require("dotenv").config();

var pool = mysql.createPool({
  connectionLimit: 2,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  debug: false
});

let news = new News(pool);
let category = new Category(pool);
let comment = new Comment(pool);

require("./router.js")(app, pool, news, category, comment);

var server = app.listen(process.env.PORT || 8080);
