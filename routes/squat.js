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

router.get("/save", function (req, res) {
  var sporttype = req.query.sporttype; //유저운동타입
  var count = req.query.count; //카운트
  var kcal = req.query.kcal; //소모칼로리

  var now = new Date(Date.now());
  var day =
    now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
  console.log(req.session.userid, sporttype, count, kcal);
  var insertsql =
    "INSERT INTO `capstone`.`savedata` (`userid`, `sporttype`, `count`, `kcal`, `date`) VALUES ('" +
    req.session.userid +
    "', '" +
    sporttype +
    "', '" +
    count +
    "', '" +
    kcal +
    "', '" +
    day +
    "');";
  connect.query(insertsql, function (err, row, fields) {
    console.log("데이터베이스 삽입성공");
    res.send("전송성공");
  });
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("squat", { title: "squat", userid: req.session.userid });
});

module.exports = router;
