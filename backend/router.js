module.exports = function(app, pool, news, category, comment) {
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
    console.log("/sak: fikk GET request fra klient");
    news.getAll((status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  // GET sak gitt id
  app.get("/sak/:sak_id", (req, res) => {
    console.log("/sak/:sak_id: fikk GET request fra klient");
    news.getOne(req.params.sak_id, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  // GET saker gitt viktighet
  app.get("/viktighet/:viktighet", (req, res) => {
    console.log("/viktighet/:viktighet: Fikk GET request fra klient");
    news.getAllByImportance(req.params.viktighet, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  // GET saker gitt kategori
  app.get("/kategori/:kategori_id", (req, res) => {
    console.log("/kategori/:kategori_id: fikk GET request fra klient");
    news.getAllByCategory(req.params.kategori_id, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  // GET saker gitt søk
  app.get("/sok/:sokestreng", (req, res) => {
    console.log("/sok/:sokestreng fikk GET request fra klient");
    news.getAllBySearch(req.params.sokestreng, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  // POST en ny sak i sak
  app.post("/sak", (req, res) => {
    console.log("/sak: fikk POST request");
    news.createOne(req.body, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  // DELETE sak gitt id
  app.delete("/sak/:sak_id", (req, res) => {
    console.log("/sak/:sak_id Fikk DELETE request fra klient");
    news.deleteOne(req.params.sak_id, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  // PUT for å oppdatere en kolonne
  app.put("/sak/:sak_id", (req, res) => {
    console.log("/sak/:sak_id Fikk PUT-request fra klienten");
    news.updateOne(req.params.sak_id, req.body, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  // PUT for å oppdatere antall visninger for en sak
  app.put("/visninger/:sak_id", (req, res) => {
    console.log("/visninger/:id fikk PUT-request fra klienten");
    news.updateOneViews(req.params.sak_id, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  // GET alle kategorier i kategori
  app.get("/kategori", (req, res) => {
    console.log("/kategori: fikk GET request fra klient");
    category.getAll((status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  // GET alle kommentarer for en gitt sak
  app.get("/kommentar/:sak_id", (req, res) => {
    console.log("/kommentar/:sak_id fikk GET request fra klient");
    comment.getAll(req.params.sak_id, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  // POST en kommentar for en sak
  app.post("/kommentar/:sak_id", (req, res) => {
    console.log("/kommentar/:sak_id fikk POST request");
    comment.createOne(req.params.sak_id, req.body, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });
};
