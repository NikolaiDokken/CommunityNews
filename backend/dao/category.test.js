// @flow

var mysql = require("mysql");

const Category = require("./category.js");
const runsqlfile = require("./runsqlfile.js");

// GitLab CI Pool
var pool = mysql.createPool({
  connectionLimit: 2,
  host: "mysql",
  user: "root",
  password: "password",
  database: "testDB",
  debug: false,
  multipleStatements: true
});

let category = new Category(pool);

beforeAll(done => {
  runsqlfile("dao/create_tables.sql", pool, () => {
    runsqlfile("dao/create_testdata.sql", pool, done);
  });
});

afterAll(() => {
  pool.end();
});

test("get all categories from db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(4);
    expect(data[0].kategori_navn).toBe("Sport");
    done();
  }

  category.getAll(callback);
});