var mysql = require("mysql");

const News = require("./news.js");
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

let news = new News(pool);

beforeAll(done => {
  runsqlfile("dao/create_tables.sql", pool, () => {
    runsqlfile("dao/create_testdata.sql", pool, done);
  });
});

afterAll(() => {
  pool.end();
});

test("get an article from db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(1);
    expect(data[0].forfatter).toBe("Nikolai Roede Dokken");
    expect(data[0].overskrift).toBe("overskrift1");
    done();
  }

  news.getOne(1, callback);
});

test("get all articles from db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data.length=" + data.length
    );
    expect(data.length).toBe(4);
    done();
  }

  news.getAll(0, callback);
});

test("get all articles from db by importance", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data.length=" + data.length
    );
    expect(data.length).toBe(4);
    done();
  }

  news.getAllByImportance(1, callback);
});

test("get all articles from db by category", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data.length=" + data.length
    );
    expect(data.length).toBe(1);
    done();
  }

  news.getAllByCategory(3, callback);
});

test("get all articles from db by search", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data.length=" + data.length
    );
    expect(data.length).toBe(1);
    done();
  }

  news.getAllBySearch("overskrift1", callback);
});

test("add article to db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  news.createOne(
    {
      overskrift: "Ny overskrift",
      innhold: "nytt innhold",
      bilde: "bildeurl.com",
      kategori_id: 3,
      viktighet: 1
    },
    callback
  );
});

test("update an article in the database", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data.length=" + data.length
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  news.updateOne(
    4,
    {
      overskrift: "Oppdatert overskrift",
      innhold: "oppdatert innhold",
      bilde: "Oppdatert bilde",
      kategori_id: 1,
      viktighet: 1
    },
    callback
  );
});

test("update amount of views for an article", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data.length=" + data.length
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  news.updateOneViews(3, callback);
});

test("delete an article in the database", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data.length=" + data.length
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  news.deleteOne(1, callback);
});
