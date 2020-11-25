var db = require('./db')();
var model = null;
function initModel(){
  db.run("CREATE TABLE IF NOT EXISTS ordenes(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, phone TEXT, produc TEXT, pago TEXT, state INTEGER, sales INTEGER )");
  model = {};

  model.getAll = function (handler) {
    db.all("SELECT * from ordenes;",
      function (err, rows) {
        if (err) {
          return handler(err, null);
        } else {
          return handler(null, rows);
        }
      }
    )
  }

  model.getOne = function (id, handler) {
    db.get("SELECT * from ordenes where id = ?;", [id],
      function (err, row) {
        if (err) {
          return handler(err, null);
        } else {
          return handler(null, row || {});
        }
      }
    )
  }

  model.getTopTen = function ( handler) {
    db.all("SELECT * from ordenes order by sales desc limit 10;", [],
      function (err, rows) {
        if (err) {
          return handler(err, null);
        } else {
          return handler(null, rows || []);
        }
      }
    )
  }


  model.addOne = function (name, email, phone, produc, pago, state, handler) {
    db.run(
      "INSERT INTO ordenes (name, email, phone, produc, pago, state, sales) VALUES (?, ?, ?, ?, ?, 1, 0);",
      [name, email, phone, produc, pago, state],
      function (err, rslt) {
        console.log(rslt);
        if (err) {
          return handler(err, null);
        } else {
          return handler(null, true);
        }
      }
    );
  }

  model.updateOne = function (id, produc, sales, handler) {
    db.run(
      "UPDATE ordenes set  produc = ? , sales = sales + ? where id = ?;",
      [ produc, sales, id],
      function (err, rslt) {
        console.log(rslt);
        if (err) {
          return handler(err, null);
        } else {
          return handler(null, true);
        }
      }
    );
  }

  model.deleteOne = function (id, handler) {
    db.run(
      "DELETE from ordenes where id = ?;",
      [id],
      function (err, rslt) {
        console.log(rslt);
        if (err) {
          return handler(err, null);
        } else {
          return handler(null, true);
        }
      }
    );
  }

  return model;
}

module.exports = function () {
  if (!model) {
    return initModel();
  } else {
    return model;
  }
}