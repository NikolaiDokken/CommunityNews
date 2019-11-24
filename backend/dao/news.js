const Dao = require("./dao.js");

module.exports = class News extends Dao {
  getAll(offset, callback) {
    super.query("SELECT * FROM sak ORDER BY tidspunkt LIMIT " + offset + ", 10", [], callback);
  }

  getAllByImportance(importance, callback) {
    super.query(
      "SELECT sak_id, overskrift, innhold, bilde, tidspunkt FROM sak WHERE viktighet=? ORDER BY tidspunkt DESC LIMIT 20",
      [importance],
      callback
    );
  }

  getAllByCategory(category_id, callback) {
    super.query(
      "SELECT sak_id, overskrift, innhold, bilde, tidspunkt FROM sak WHERE kategori_id=? ORDER BY tidspunkt DESC LIMIT 20",
      [category_id],
      callback
    );
  }

  getAllBySearch(search, callback) {
    super.query(
      "SELECT sak_id, overskrift FROM sak WHERE overskrift LIKE ? LIMIT 5",
      ["%" + search + "%"],
      callback
    );
  }

  getOne(id, callback) {
    super.query(
      "SELECT forfatter, overskrift, innhold, tidspunkt, bilde, kategori_navn, kategori_id, viktighet, visninger FROM sak JOIN kategori USING(kategori_id) WHERE sak_id=?",
      [id],
      callback
    );
  }

  createOne(json, callback) {
    var val = [
      json.brukernavn,
      json.overskrift,
      json.innhold,
      json.bilde,
      json.kategori_id,
      json.viktighet
    ];
    super.query(
      "insert into sak (forfatter, overskrift, innhold, bilde, kategori_id, viktighet) values (?,?,?,?,?,?)",
      val,
      callback
    );
  }

  updateOne(id, json, callback) {
    var val = [
      json.brukernavn,
      json.overskrift,
      json.innhold,
      json.bilde,
      json.kategori_id,
      json.viktighet,
      json.tidspunkt,
      id
    ];
    super.query(
      "UPDATE sak SET forfatter=?, overskrift=?, innhold=?, bilde=?, kategori_id=?, viktighet=?, tidspunkt=? WHERE sak_id=?",
      val,
      callback
    );
  }

  updateOneViews(sak_id, callback) {
    super.query(
      "UPDATE sak SET visninger=(visninger + 1) WHERE sak_id=?",
      [sak_id],
      callback
    );
  }

  deleteOne(id, callback) {
    super.query("DELETE FROM sak WHERE sak_id=?", [id], callback);
  }
};
