const Dao = require("./dao.js");

module.exports = class News extends Dao {
  getAll(callback) {
    super.query("SELECT * FROM sak ORDER BY tidspunkt", [], callback);
  }

  getOne(id, callback) {
    super.query(
      "SELECT forfatter, overskrift, innhold, tidspunkt, bilde, kategori_navn, viktighet FROM sak JOIN kategori USING(kategori_id) WHERE sak_id=?",
      [id],
      callback
    );
  }

  createOne(json, callback) {
    var val = [
      json.overskrift,
      json.innhold,
      json.bilde,
      json.kategori_id,
      json.viktighet
    ];
    super.query(
      "insert into sak (overskrift, innhold, bilde, kategori_id, viktighet) values (?,?,?,?,?)",
      val,
      callback
    );
  }

  updateOne(id, json, callback) {
    var val = [
      json.overskrift,
      json.innhold,
      json.bilde,
      json.kategori_id,
      json.viktighet,
      id
    ];
    super.query(
      "UPDATE sak SET overskrift=?, innhold=?, bilde=?, kategori_id=?, viktighet=? WHERE sak_id=?",
      val,
      callback
    );
  }

  deleteOne(id, callback) {
    super.query("DELETE FROM sak WHERE sak_id=?", [id], callback);
  }
};
