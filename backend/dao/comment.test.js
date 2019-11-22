const Comment = require("./comment.js");

let comment = new Comment(pool);

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
    expect(data[5].brukernavn).toBe("Ny bruker");

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
