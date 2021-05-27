var express = require("express");
var mysql = require("mysql");

var router = express.Router();

var connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "8830",
  database: "capstone",
  multipleStatements: true,
});
connect.connect();

router.post("/check", function (req, res, next) {
  var id = req.body.id;
  var password = req.body.password;
  var check =
    "select * from userdata where id='" +
    id +
    "' AND password='" +
    password +
    "'";
  connect.query(check, function (err, result, field) {
    var string = JSON.stringify(result);
    var json = JSON.parse(string);
    if (err) {
      console.log(err);
    } else if (result.length == 0) {
      res.send();
      res.redirect("/login");
    } else {
      console.log(json[0]);
      req.session.userid = id;
      res.redirect("/exercise");
    }
  });
});

/* GET home page. */
router.get("/", function (req, res, next) {
  try {
    req.session.destroy(function () {
      req.session;
    });
    res.render("login", { title: "Login" });
  } catch (error) {
    res.render("login", { title: "Login" });
  }
});

module.exports = router;
