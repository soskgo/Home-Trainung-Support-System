var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var router = express.Router();

var connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "8830",
  database: "capstone",
  multipleStatements: true,
});
connect.connect();

/* GET home page. */
router.get("/", function (req, res, next) {
  var selectsql = "SELECT * FROM capstone.sport";
  connect.query(selectsql, function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      res.render("sport", {
        title: "Sport",
        rows: JSON.stringify(rows),
        userid: req.session.userid,
      });
    }
  });
});
module.exports = router;
