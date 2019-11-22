const Category = require("./category.js");

let category = new Category(pool);

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
