var mysql = require("mysql");

const Comment = require("./comment.js");
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

let comment = new Comment(pool);

beforeAll(done => {
  runsqlfile("dao/create_tables.sql", pool, () => {
    runsqlfile("dao/create_testdata.sql", pool, done);
  });
});

afterAll(() => {
  pool.end();
});

test("get all comments from db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(3);
    expect(data[0].brukernavn).toBe("brukernavn1");
    done();
  }

  comment.getAll(11, callback);
});

test("add comment to db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);

    done();
  }

  comment.createOne(11,
    {
      brukernavn: "Ny bruker",
      kommentar: "ny kommentar"
    },
    callback
  );
});
