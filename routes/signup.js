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

router.get("/check_id", function (req, res) {
  var id = req.query.id;
  var query =
    "select count(id) as count from userdata where id like '" + id + "'";
  connect.query(query, function (err, result, field) {
    if (result[0]["count"] == 0) {
      res.send("X");
    } else {
      res.send("O");
    }
  });
});

router.post("/submitdata", function (req, res, next) {
  var id = req.body.id;
  var password = req.body.password;
  var email = req.body.email;
  var phonenumber = req.body.phonenumber;
  var query =
    "INSERT INTO userdata (id,password,email,phonenumber) VALUES(?,?,?,?)";
  connect.query(query, [id, password, email, phonenumber], function (
    err,
    result,
    field
  ) {
    if (err) {
      console.log(err);
    } else {
      res.send("Suc");
    }
  });
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("signup", { title: "SignUp", userid: req.session.userid });
});

module.exports = router;
