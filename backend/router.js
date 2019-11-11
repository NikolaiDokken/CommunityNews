module.exports = function(app, pool) {
  // BACKEND CONFIG
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, PUT, GET, OPTIONS, DELETE"
    );
    next();
  });

  // GET alle saker i sak
  app.get("/sak", (req, res) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
      console.log("Connected to database");
      if (err) {
        console.log("Feil ved kobling til databasen");
        res.json({ error: "feil ved ved oppkobling" });
      } else {
        connection.query(
          "SELECT * FROM sak ORDER BY tidspunkt",
          (err, rows) => {
            connection.release();
            if (err) {
              console.log(err);
              res.json({ error: "error querying" });
            } else {
              console.log(rows);
              res.json(rows);
            }
          }
        );
      }
    });
  });

  // GET sak gitt id
  app.get("/sak/:SakID", (req, res) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
      console.log("Koblet til databasen");
      if (err) {
        console.log("Feil ved kobling til databasen");
        res.json({ error: "feil ved oppkobling" });
      } else {
        connection.query(
          "SELECT forfatter, overskrift, innhold, tidspunkt, bilde, kategori_navn, viktighet FROM sak JOIN kategori USING(kategori_id) WHERE sak_id=?",
          req.params.SakID,
          (err, rows) => {
            connection.release();
            if (err) {
              console.log(err);
              res.json({ error: "error querying" });
            } else {
              console.log(rows);
              res.json(rows);
            }
          }
        );
      }
    });
  });

  // GET saker gitt viktighet
  app.get("/viktighet/:viktighet", (req, res) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
      console.log("Koblet til databasen");
      if (err) {
        console.log("Feil ved kobling til databasen");
        res.json({ error: "feil ved oppkobling" });
      } else {
        connection.query(
          "SELECT * FROM sak JOIN kategori USING(kategori_id) WHERE viktighet=? ORDER BY tidspunkt DESC LIMIT 20",
          req.params.viktighet,
          (err, rows) => {
            connection.release();
            if (err) {
              console.log(err);
              res.json({ error: "error querying" });
            } else {
              console.log(rows);
              res.json(rows);
            }
          }
        );
      }
    });
  });

  // POST ny sak, kan testes med følgende på POSTMAN:
  /*
    { 
        "overskrift": "Emir Derouiche tar programmering til nye høyder",
        "innhold": "Med hannukah rett rundt hjørnet setter Emir et godt eksempel for resten av disiplene sine",
        "bilde": "www.randomimgage.com",
        "kategori": "religion",
        "viktighet": 2
    }
    */

  // POST en sak i sak-tabellen
  app.post("/sak", (req, res) => {
    console.log("Legger til nyhetssak");
    pool.getConnection((err, connection) => {
      if (err) {
        console.log("Feil ved oppkobling");
        res.json({ error: "feil ved oppkobling" });
      } else {
        console.log("Fikk databasekobling");
        var val = [
          req.body.overskrift,
          req.body.innhold,
          req.body.bilde,
          req.body.kategori,
          req.body.viktighet
        ];
        connection.query(
          "insert into sak (overskrift, innhold, bilde, kategori_id, viktighet) values (?,?,?, (SELECT kategori_id FROM kategori WHERE kategori_navn=?),?)",
          val,
          err => {
            if (err) {
              console.log(err);
              res.status(500);
              res.json({ error: "Feil ved insert" });
            } else {
              console.log("insert ok");
              res.send("");
            }
          }
        );
      }
    });
  });

  // DELETE sak gitt id
  app.delete("/sak/:sak_id", (req, res) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
      console.log("Koblet til databasen");
      if (err) {
        console.log("Feil ved kobling til databasen");
        res.json({ error: "feil ved oppkobling" });
      } else {
        connection.query(
          "DELETE FROM sak WHERE sak_id=?",
          req.params.sak_id,
          (err, rows) => {
            connection.release();
            if (err) {
              console.log(err);
              res.json({ error: "error querying" });
            } else {
              console.log(rows);
              res.json(rows);
            }
          }
        );
      }
    });
  });

  // PUT for å oppdatere en kolonne
  app.put("/sak/:id", (req, res) => {
    console.log("Fikk PUT-request fra klienten");
    pool.getConnection((err, connection) => {
      if (err) {
        console.log("Feil ved oppkobling");
        res.json({ error: "feil ved oppkobling" });
      } else {
        console.log("Fikk databasekobling");
        var val = [
          req.body.overskrift,
          req.body.innhold,
          req.body.bilde,
          req.body.kategori_id,
          req.body.viktighet,
          req.params.id
        ];
        console.log(val);
        connection.query(
          "UPDATE sak SET overskrift=?, innhold=?, bilde=?, kategori_id=?, viktighet=? WHERE sak_id=?",
          val,
          err => {
            if (err) {
              console.log(err);
              res.status(500);
              res.json({ error: "Feil ved insert" });
            } else {
              console.log("update ok");
              res.send("");
            }
          }
        );
      }
    });
  });
};
