var express = require("express");
var router = express.Router();
var mysql = require("mysql");

var connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "8830",
  database: "capstone",
  multipleStatements: true,
});

/* GET home page. */
router.get("/", function (req, res, next) {
  connect.query(
    "Select * from savedata where userid = '" + req.session.userid + "';",
    function (err, result, field) {
      connect.query(
        "SELECT userid, date, sum(kcal) AS kcal FROM capstone.savedata where userid = '" +
          req.session.userid +
          "' group by date order by date;",
        function (err, result1, filed) {
          res.render("viewdata", {
            title: "UserView",
            data: JSON.stringify(result),
            groupDate: JSON.stringify(result1),
            userid: req.session.userid,
          });
        }
      );
    }
  );
});

module.exports = router;