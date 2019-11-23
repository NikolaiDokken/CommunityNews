// @flow

const Dao = require("./dao.js");
module.exports = class Comment extends Dao {
  getAll(sak_id, callback) {
    super.query(
      "SELECT brukernavn, kommentar, tidspunkt FROM kommentar WHERE sak_id = ?",
      [sak_id],
      callback
    );
  }

  createOne(sak_id, json, callback) {
    var val = [json.brukernavn, json.kommentar, sak_id];
    super.query(
      "insert into kommentar (brukernavn, kommentar, sak_id) values (?,?,?)",
      val,
      callback
    );
  }
};
