// @flow
const Dao = require("./dao.js");
module.exports = class Category extends Dao {
  getAll(callback){
    super.query(
      "SELECT kategori_id, kategori_navn FROM kategori",
      [],
      callback
    );
  }
};
